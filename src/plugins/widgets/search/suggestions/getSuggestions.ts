import { SuggestionsResult } from './interfaces';

// For mounting the result
declare global {
    interface Window {
        mountResult: { };
    }
}

export default (url: string, callback: (data: SuggestionsResult) => void) => {
  const id = 'i' + Math.random().toString(36).slice(2); // Create unique id to return to correct result
  const mountResult = { };

  mountResult[id] = (data: SuggestionsResult) => {
    callback(data);

    delete mountResult[id];

    const script = document.getElementById('suggestionsQuery' + id);

    if (script !== null) {
      script.remove();
    }
  };

  window.mountResult = mountResult;

  const s = document.createElement('script');

  s.src = url + '&callback=mountResult.' + id;
  s.id = 'suggestionsQuery' + id;

  document.head.appendChild(s);
};
