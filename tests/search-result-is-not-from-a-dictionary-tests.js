var test = require('tape');
var searchResultIsNotFromADictionary = require('../search-result-is-not-from-a-dictionary');

test('Basic tests', function basic(t) {
  var searchResults = [
    {
      title: 'Translation of Chiffarobes in English'
    },
    {
      title: 'Chiffarobes | Facebook'
    },
    {
      title: 'Chiffarobes - We need another round of chiffarobes here...'
    },
    {
      title: 'Definitions of chiffarobes - OneLook Dictionary Search'
    },
    {
      title: 'Meaning of chiffarobes - Encyclo'
    },
    {
      title: 'Chiffarobes: Definition with Chiffarobes Pictures and Photos'
    },
    {
      title: 'chiffarobes - WebSaru Online English Dictionary'
    },
    {
      title: 'Expand Collapse - Twitter'
    },
    {
      title: 'Everyday Genius: Sommer Browning'
    },
    {
      title: 'Welcome To Haven House | Jathan & Heather'
    },
    {
      title: 'PETA Comes Out Against Publication Of To Kill A ... - Reader'
    },
    {
      title: 'All comments on Most expensive Furniture Items - YouTube'
    },
    {
      title: 'Who is Noo-Noo???? - Google Groups'
    },
    {
      title: 'bart_calendar: PETA Comes Out Against Publication Of To ...'
    },
    {
      title: 'Indiana Gazette from Indiana, Pennsylvania · Page 13'
    },
    {
      title: 'Butter No Parsnips: May 2007'
    },
    {
      title: 'To Kill a Mockingbird - Inter-team Blog: It is a sin to kill a ...'
    },
    {
      title: 'ふぁぼったー Hoseyのふぁぼられ(1072)'
    },
    {
      title: 'Most expensive Furniture Items | Coffee Pro Tips'
    }
  ];

  var answers = [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ];

  t.plan(searchResults.length);
  
  searchResults.forEach(testWithSearchResult);

  function testWithSearchResult(searchResult, i) {
    t.equal(searchResultIsNotFromADictionary(searchResult), answers[i]);
  }  
});
