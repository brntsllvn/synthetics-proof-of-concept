var synthetics = require('Synthetics');
const log = require('SyntheticsLogger');
const lighthouse = require('lighthouse');

const lighthouseMetrics = async function () {
    const page = await synthetics.getPage(); // Get instrumented page from Synthetics
    const browser = await page.browser();
    const {report} = await lighthouse("https://google.com", {
      port: (new URL(browser.wsEndpoint())).port,
      output: 'json',
      logLevel: 'info'
    });
    
    const audits = JSON.parse(report).audits;
    const first_contentful_paint = audits['first-contentful-paint'].displayValue;
    const total_blocking_time = audits['total-blocking-time'].displayValue;
    const time_to_interactive = audits['interactive'].displayValue;
    const first_input_delay = audits['max-potential-fid'].displayValue;

    log.info(`🎨 First Contentful Paint: ${first_contentful_paint}`);
    log.info(`⌛️ Total Blocking Time: ${total_blocking_time}`);
    log.info(`👆 Time To Interactive: ${time_to_interactive}`);
    log.info(`🥑 First Input Delay: ${first_input_delay}`);
    
    browser.close();
};

exports.handler = async () => {  // Exported handler function 
    return await lighthouseMetrics();
};
