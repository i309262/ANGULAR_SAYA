import { JeaAngularPage } from './app.po';

describe('jea-angular App', () => {
  let page: JeaAngularPage;

  beforeEach(() => {
    page = new JeaAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
