const { exec } = require('child_process');

console.log('Running Stock Price Checker Tests...\n');

// Run the tests
const testProcess = exec('npm test', (error, stdout, stderr) => {
    if (error) {
        console.error('Test execution error:', error);
        return;
    }
    
    if (stderr) {
        console.error('Test stderr:', stderr);
    }
    
    console.log('Test output:', stdout);
});

testProcess.stdout.on('data', (data) => {
    console.log(data);
});

testProcess.stderr.on('data', (data) => {
    console.error(data);
});

testProcess.on('close', (code) => {
    console.log(`\nTests completed with exit code ${code}`);
    if (code === 0) {
        console.log('✅ All tests passed!');
    } else {
        console.log('❌ Some tests failed.');
    }
});
