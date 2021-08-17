import puppeteer from "puppeteer";

const mockProjectsData = {
  Name: "dvir",
  Projects: {
    ticket: {
      details: "ticket manager for everything",
      duration: "3 days",
    },
  },
};
const projectsNames = ["ticket", "trivia", "delete test"];

let page;
let browser;
let alertMessage;

jest.setTimeout(100000);
const projectName = "Assignment UI";
describe(projectName, () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 200,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
    page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      setTimeout(async () => {
        await dialog.accept();
      }, 3000);
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  test("The user should be able to add his/her name", async () => {
    await page.type("input[class=name-input]", mockProjectsData.Name);

    const nameInputValue = await page.$eval(
      ".name-input",
      (element) => element.value
    );
    expect(nameInputValue).toBe(mockProjectsData.Name);
  });

  test("The user should be able to add project name", async () => {
    await page.type("input[name=projectNameInput]", projectsNames[0]);

    await page.click("button[class=add-project-name-button]");

    const projectNameValue = await page.$eval(
      ".project-name-span",
      (element) => element.textContent
    );
    expect(projectNameValue.slice(0, -1)).toBe(projectsNames[0]);
  });

  test("The user should be able to delete project name and get a confirm message", async () => {
    const projectNameInput = await page.$("input[name=projectNameInput]");
    await projectNameInput.click({ clickCount: 3 });
    await projectNameInput.type(projectsNames[2]);

    await page.click("button[class=add-project-name-button]");

    const projectsNamesSpans = await page.$$(".project-name-span");
    const projectsNamesCount = projectsNamesSpans.length;

    const deleteButton = await projectsNamesSpans[1].$(".project-name-button");
    await deleteButton.click();

    const projectsNamesAfterDelete = await page.$$(".project-name-span");
    const projectsNamesAfterDeleteCount = projectsNamesAfterDelete.length;

    expect(alertMessage).toBe("Project name deleted successfully");
    expect(projectsNamesAfterDeleteCount).toBe(projectsNamesCount - 1);
  });

  test("The user should be able to add project details for each project", async () => {
    await page.click(".project-details-button");

    await page.select("select[name=name-select]", projectsNames[0]);
    const nameSelectValue = await page.$eval(
      "select[name=name-select]",
      (element) => element.value
    );
    expect(nameSelectValue).toBe(projectsNames[0]);

    await page.type("textarea", mockProjectsData.Projects.ticket.details);
    const detailsValue = await page.$eval(
      "textarea",
      (element) => element.value
    );
    expect(detailsValue).toBe(mockProjectsData.Projects.ticket.details);

    await page.type(
      "input[name=durationValue]",
      mockProjectsData.Projects.ticket.duration.split(" ")[0]
    );
    const durationValue = await page.$eval(
      "input[name=durationValue]",
      (element) => element.value
    );
    expect(durationValue).toBe(
      mockProjectsData.Projects.ticket.duration.split(" ")[0]
    );

    await page.type(
      "select[name=durationSelect]",
      mockProjectsData.Projects.ticket.duration.split(" ")[1]
    );
    const durationSelectValue = await page.$eval(
      "select[name=durationSelect]",
      (element) => element.value
    );
    expect(durationSelectValue).toBe(
      mockProjectsData.Projects.ticket.duration.split(" ")[1]
    );
  });

  test("The user should see the form's data in JSON format which is going to be sent to the server", async () => {
    await page.click("p[class=json-view-p]");

    const expectedJson = await page.$eval(
      "pre",
      (element) => element.textContent
    );

    expect(expectedJson).toBe(JSON.stringify(mockProjectsData, null, 2));
  });

  test("The user should delete project details", async () => {
    await page.click("p[class=json-view-p]");
    const projectsDetailsdivBefore = await page.$$(".project-details-div");

    await page.click(".project-details-remove");

    const projectsDetailsdivAfter = await page.$(".project-details-div");

    expect(projectsDetailsdivBefore.length).toBe(1);
    expect(projectsDetailsdivAfter).toBe(null);
  });

  test("The user should delete project name and the project details form become empty and a validation message should appear", async () => {
    await page.click(".project-details-button");

    await page.select("select[name=name-select]", projectsNames[0]);
    await page.type("textarea", mockProjectsData.Projects.ticket.details);
    await page.type(
      "input[name=durationValue]",
      mockProjectsData.Projects.ticket.duration.split(" ")[0]
    );
    await page.type(
      "select[name=durationSelect]",
      mockProjectsData.Projects.ticket.duration.split(" ")[1]
    );

    const projectNameSpan = await page.$(".project-name-span");
    const deleteButton = await projectNameSpan.$(".project-name-button");
    await deleteButton.click();
    expect(alertMessage).toBe("Project name deleted successfully");

    const nameSelectValue = await page.$eval(
      "select[name=name-select]",
      (element) => element.value
    );
    expect(nameSelectValue).toBe("default-select-value");

    const detailsValue = await page.$eval(
      "textarea",
      (element) => element.value
    );
    expect(detailsValue).toBe("");

    const durationValue = await page.$eval(
      "input[name=durationValue]",
      (element) => element.value
    );
    expect(durationValue).toBe("");

    const durationSelectValue = await page.$eval(
      "select[name=durationSelect]",
      (element) => element.value
    );
    expect(durationSelectValue).toBe("default-select-value");
  });
});
