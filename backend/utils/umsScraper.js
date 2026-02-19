import puppeteer from 'puppeteer';
import fs from 'fs';
import { execSync } from 'child_process';

// Try to find chromium executable
const findChromium = () => {
  // First, try to get puppeteer's bundled chromium
  try {
    const puppeteerPath = puppeteer.executablePath();
    if (fs.existsSync(puppeteerPath)) {
      console.log(`Found puppeteer bundled chromium at: ${puppeteerPath}`);
      return puppeteerPath;
    }
  } catch (e) {
    console.log('Puppeteer bundled chromium not found');
  }
  
  // Try common system paths
  const possiblePaths = [
    '/usr/lib/chromium/chromium',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  
  for (const path of possiblePaths) {
    try {
      if (fs.existsSync(path)) {
        console.log(`Found system chromium at: ${path}`);
        return path;
      }
    } catch (e) {
      // Continue to next path
    }
  }
  
  // Try to find using 'which' command
  try {
    const whichPath = execSync('which chromium-browser || which chromium || which google-chrome || which google-chrome-stable', { encoding: 'utf8' }).trim();
    if (whichPath && fs.existsSync(whichPath)) {
      console.log(`Found chromium using which: ${whichPath}`);
      return whichPath;
    }
  } catch (e) {
    // which command failed
  }
  
  console.log('Chromium not found in any location, letting puppeteer handle it');
  return undefined;
};

export const verifyAndScrapeUMS = async (regNo, password) => {
  const executablePath = findChromium();
  
  const launchOptions = {
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  };
  
  if (executablePath) {
    launchOptions.executablePath = executablePath;
  }
  
  console.log('Launching browser with options:', { ...launchOptions, executablePath: executablePath || 'auto-detected' });
  const browser = await puppeteer.launch(launchOptions);

  const page = await browser.newPage();
  
  // Set a longer timeout for navigation
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  try {
    console.log(`Attempting to login with regNo: ${regNo}`);
    
    // 1️⃣ Go to login page
    await page.goto(
      'https://adamasknowledgecity.ac.in/student/login',
      { waitUntil: 'domcontentloaded', timeout: 30000 }
    );
    
    console.log('Login page loaded successfully');

    // 2️⃣ Fill credentials
    await page.type('input[name="registration_no"]', regNo, { delay: 50 });
    await page.type('input[name="password"]', password, { delay: 50 });

    // 3️⃣ Login
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('#login_btn'),
    ]);

    // 4️⃣ Invalid credentials check
    const currentUrl = page.url().toLowerCase();
    console.log('Current URL after login attempt:', currentUrl);
    
    if (currentUrl.includes('login')) {
      // Check for error message on the page
      const errorMsg = await page.evaluate(() => {
        const errorEl = document.querySelector('.alert-danger, .error-message, [role="alert"]');
        return errorEl ? errorEl.innerText.trim() : null;
      });
      
      if (errorMsg) {
        throw new Error(`Login failed: ${errorMsg}`);
      }
      throw new Error('Invalid Credentials - Please check your registration number and password');
    }

    // 5️⃣ Wait for dashboard attendance cards
    await page.waitForSelector('.stat-card-modern', { timeout: 10000 });

    // Optional small delay (some dashboards animate)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 6️⃣ Scrape Data
    const studentData = await page.evaluate(() => {
      let name = "Student";
      let roll = "";
      let semester = "";

      // --------- HEADER INFO ---------
      const greeting = document.getElementById('greetingMessage');

      if (greeting && greeting.nextElementSibling) {
        const nameEl = greeting.nextElementSibling;
        name = nameEl.innerText.trim();

        const detailsEl = nameEl.nextElementSibling;
        if (detailsEl) {
          const text = detailsEl.innerText;

          const regMatch = text.match(/Registration No.*?:\s*([A-Za-z0-9\/]+)/i);
          const semMatch = text.match(/Semester\s+([IVX0-9]+)/i);

          roll = regMatch ? regMatch[1].trim() : "";
          semester = semMatch ? semMatch[1].trim() : "";
        }
      }

      // --------- ATTENDANCE STATS ---------
      let totalClasses = 0;
      let present = 0;
      let percentage = 0;

      const cards = document.querySelectorAll('.stat-card-modern');

      cards.forEach(card => {
        const labelEl = card.querySelector('h4');
        const valueEl = card.querySelector('div[style*="font-size: 32px"]');

        if (!labelEl || !valueEl) return;

        const label = labelEl.innerText.trim().toLowerCase();
        const value = valueEl.innerText.trim();

        if (label.includes("total")) {
          totalClasses = parseInt(value) || 0;
        }

        if (label.includes("present")) {
          present = parseInt(value) || 0;
        }

        if (label.includes("percentage")) {
          percentage = parseFloat(value.replace('%', '')) || 0;
        }
      });

      return {
        name,
        roll_no: roll,
        semester,
        department: "Computer Science",
        attendance: percentage,
        attended: present,
        total: totalClasses
      };
    });

    console.log("Scraped Data:", studentData);

    await browser.close();
    return studentData;

  } catch (error) {
    await browser.close();
    throw error;
  }
};
