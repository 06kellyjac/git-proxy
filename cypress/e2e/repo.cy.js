describe('Repo', () => {
  beforeEach(() => {
    cy.login('admin', 'admin');

    cy.visit('/dashboard/repo');

    // prevent failures on 404 request and uncaught promises
    cy.on('uncaught:exception', () => false);
  });

  describe('Code button for repo row', () => {
    it('Opens tooltip with correct content and can copy', () => {
      const cloneURL = 'http://localhost:8000/finos/git-proxy.git';
      const tooltipQuery = 'div[role="tooltip"]';

      cy
        // tooltip isn't open to start with
        .get(tooltipQuery)
        .should('not.exist');

      cy
        // find the entry for finos/git-proxy
        .get('a[href="/dashboard/repo/git-proxy"]')
        // take it's parent row
        .closest('tr')
        // find the nearby span containing Code we can click to open the tooltip
        .find('span')
        .contains('Code')
        .should('exist')
        .click();

      cy
        // find the newly opened tooltip
        .get(tooltipQuery)
        .should('exist')
        .find('span')
        // check it contains the url we expect
        .contains(cloneURL)
        .should('exist')
        .parent()
        // find the adjacent span that contains the svg
        .find('span')
        .next()
        // check it has the copy icon first and click it
        .get('svg.octicon-copy')
        .should('exist')
        .click()
        // check the icon has changed to the check icon
        .get('svg.octicon-copy')
        .should('not.exist')
        .get('svg.octicon-check')
        .should('exist');

      // failed to successfully check the clipboard
    });
  });
});
