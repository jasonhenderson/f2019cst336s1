module.exports = new Promise(
    function(resolve, reject) {

        try {
            console.log('starting get of full name...(async, promises)');

            let fullName = first + " " + middle + " " + last;

            console.log('doing long operation...(async, promises)');

            // Simulate something that takes a long time
            for (let i = 0; i < 1000000000; i++) {}

            console.log('done with operation. (async, promises)');

            resolve(fullName);
        }
        catch (err) {
            reject(err);
        }

    }
);
