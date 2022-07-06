/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable global-require */
import test from "@playwright/test";

test.describe("LoginTest", () => {
	test.describe.configure({ mode: 'serial' });
	require("./LoginTest.spec.ts");
});

test.describe("CreateFirm", () => {
	test.describe.configure({ mode: 'serial' });
	require("./CreateFirmTest.spec.ts");
});
