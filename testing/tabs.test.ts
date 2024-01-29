import { openTab } from '../client/taps';

describe('openTab function', () => {
  let tabLink1: HTMLElement, tabLink2: HTMLElement;
  let tab1Content: HTMLElement, tab2Content: HTMLElement;

  beforeEach(() => {
    // Set up the DOM structure with tabs and tab content
    document.body.innerHTML = `
      <div>
        <button class="tablinks" id="tablink1">Tab 1</button>
        <button class="tablinks" id="tablink2">Tab 2</button>
        <div class="tabcontent" id="tab1">Tab 1 Content</div>
        <div class="tabcontent" id="tab2">Tab 2 Content</div>
      </div>
    `;

    // Get the tab links and content elements
    tabLink1 = document.getElementById('tablink1')!;
    tabLink2 = document.getElementById('tablink2')!;
    tab1Content = document.getElementById('tab1')!;
    tab2Content = document.getElementById('tab2')!;
  });

  test('it should open the specified tab and set it as active', () => {
    // Trigger a click event on the first tab link to open Tab 1
    openTab(null, 'tab1');

    // Assertions for Tab 1
    expect(tab1Content.style.display).not.toBe('none');
    expect(tab2Content.style.display).toBe('none');
    // Add any necessary class checks if applicable

    // Trigger a click event on the second tab link to open Tab 2
    openTab(null, 'tab2');

    // Assertions for Tab 2
    expect(tab1Content.style.display).toBe('none');
    expect(tab2Content.style.display).not.toBe('none');
    // Add any necessary class checks if applicable
  });
});
