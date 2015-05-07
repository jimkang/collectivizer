test:
	node tests/rate-candidates-tests.js

pushall:
	git push origin master && npm publish
