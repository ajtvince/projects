function testFunc() {
    document.getElementById('test1').innerHTML = 'test changed'
}

function callBackTest(func) {
    func();
}

callBackTest(testFunc);

