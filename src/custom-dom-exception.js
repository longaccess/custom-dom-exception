var CustomExceptions = CustomExceptions || {};
CustomExceptions.DOMException = function (code) {
    var codes = {
        1: "INDEX_SIZE_ERR",
        3: "HIERARCHY_REQUEST_ERR",
        4: "WRONG_DOCUMENT_ERR",
        5: "INVALID_CHARACTER_ERR",
        7: "NO_MODIFICATION_ALLOWED_ERR",
        8: "NOT_FOUND_ERR",
        9: "NOT_SUPPORTED_ERR",
        11: "INVALID_STATE_ERR",
        12: "SYNTAX_ERR",
        13: "INVALID_MODIFICATION_ERR",
        14: "NAMESPACE_ERR",
        15: "INVALID_ACCESS_ERR",
        17: "TYPE_MISMATCH_ERR",
        18: "SECURITY_ERR",
        19: "NETWORK_ERR",
        20: "ABORT_ERR",
        21: "URL_MISMATCH_ERR",
        22: "QUOTA_EXCEEDED_ERR",
        23: "TIMEOUT_ERR",
        24: "INVALID_NODE_TYPE_ERR",
        25: "DATA_CLONE_ERR"
    };

    if (!(code in codes))
        throw TypeError("Invalid code: " + code);

    // create a new custom DOMException object
    var newDOMException;
    try {
        // throws a DOMException
	document.querySelectorAll("div:foo");
    } catch (e) {
        newDOMException = Object.create(Object.getPrototypeOf(e))
    }

    // override properties

    var props = {};
    props = Object.getOwnPropertyDescriptor(newDOMException.__proto__, "name");
    props.get = function() { return codes[code]; };
    Object.defineProperty(newDOMException, "name", props);

    props = Object.getOwnPropertyDescriptor(newDOMException.__proto__, "code");
    props.get = function() { return code; };
    Object.defineProperty(newDOMException, "code", props);

    props = Object.getOwnPropertyDescriptor(newDOMException.__proto__, "message");
    props.get = function() { return message; };
    Object.defineProperty(newDOMException, "message", props);

    props.get = function() { return codes[code] + ": DOM Exception " + code; };
    Object.defineProperty(newDOMException, "toString", props);

    return newDOMException;
}
