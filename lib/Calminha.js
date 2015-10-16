var queues = {};

module.exports = function () {
	var group = "";
	var fun   = null;
	var opts  = {};

	for (var i = 0; i < arguments.length; i++) {
		switch (typeof arguments[i]) {
			case "string":
				group = arguments[i];
				break;
			case "function":
				fun = arguments[i];
				break;
			case "object":
				opts = arguments[i] || {};
				break;
		}
	}

	if (queues.hasOwnProperty(group) && fun === null) {
		return queues[group];
	}

	if (fun === null) {
		throw new Error("No function defined for " + group);
	}

	return (queues[group] = new AsyncCallQueue(fun, opts));
};

function AsyncCallQueue(fun, opts) {
	var queue = [];
	var timer = null;
	var check = function () {
		if (!queue.length || timer) return;

		var args = queue.shift();

		timer = setTimeout(function () {
			timer = null;
			check();
		}, opts.interval);

		fun.apply(null, args);
	};

	opts.interval = opts.interval || 500;

	return function () {
		queue.push(arguments);

		check();
	};
}

function noop() {}
