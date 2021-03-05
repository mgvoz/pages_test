const { generateText, checkAndGenerate } = require('./util');
const puppeteer = require('puppeteer');

//UNIT TESTS- multiple checks to avoid false positives
test('should output name and age', () => {
	const text = generateText('Max', 29);
	expect(text).toBe('Max (29 years old)');
	const text2 = generateText('Anna', 50);
	expect(text2).toBe('Anna (50 years old)');
});

test('should output data-less text', () => {
	const text = generateText('', null);
	expect(text).toBe(' (null years old)');
});

//INTEGRATION TEST
test('should generate a valid text output', () => {
	const text = checkAndGenerate('Max', 29);
	expect(text).toBe('Max (29 years old)');
});

//END TO END (e2e) or UI TESTS
test('should create element with text and submit form', async () => {
	const browser = await puppeteer.launch({
		headless: false,
		//slowMo: 80,
		//args: ['--window-size=1920, 1080'],
	});
	const page = await browser.newPage();
	await page.goto(
		'file:///Users/MarissaGvozdenovich/Documents/Programming/js-testing-introduction/index.html',
	);
	await page.click('input#name');
	await page.type('input#name', 'Anna');
	await page.click('input#age');
	await page.type('input#age', '50');
	await page.click('#btnAddUser');
	const finalText = await page.$eval('.user-item', (el) => el.textContent);
	expect(finalText).toBe('Anna (50 years old)');
}, 10000);
