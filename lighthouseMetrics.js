const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

const lighthouseMetrics = async function () {
    const browser = await puppeteer.launch();
    const {report} = await lighthouse("https://zillow.com", {
      port: (new URL(browser.wsEndpoint())).port,
      output: 'json',
      logLevel: 'info'
    });

    const audits = JSON.parse(report).audits;
    const first_contentful_paint = audits['first-contentful-paint'].displayValue;
    const total_blocking_time = audits['total-blocking-time'].displayValue;
    const time_to_interactive = audits['interactive'].displayValue;
    const first_input_delay = audits['max-potential-fid'].displayValue;

    console.log(`🎨 First Contentful Paint: ${first_contentful_paint}`);
    console.log(`⌛️ Total Blocking Time: ${total_blocking_time}`);
    console.log(`👆 Time To Interactive: ${time_to_interactive}`);
    console.log(`🥑 First Input Delay: ${first_input_delay}`);
    
    browser.close();
};

lighthouseMetrics();
