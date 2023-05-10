import type { ScrollPage } from './types';

describe('ScrollPage interface', () => {
  it('scrolls', () => {
    let scrollPage: ScrollPage;
    try {
      // @ts-expect-error
      scrollPage.scroll();
    } catch (error) {
      fail(error);
    }
  });
});
