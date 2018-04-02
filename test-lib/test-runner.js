// import jasmine testing suite
let Jasmine = require('jasmine');
let jasmine = new Jasmine();

// load the config file
jasmine.loadConfigFile('test-lib/config/jasmine.json');

// execute tests
jasmine.execute();