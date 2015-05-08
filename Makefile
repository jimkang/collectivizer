test:
	node tests/rate-candidates-tests.js
	node tests/search-result-is-not-from-a-dictionary-tests.js

pushall:
	git push origin master && npm publish
