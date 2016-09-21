// Import the packages
var mysql = require('mysql');

//=== Local database connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'EmailProject',
    password: 'tiva101'
});

// Connect database
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
    } else {
        console.log('Connected as id: ' + connection.threadId);
    }
});


// Get User's Password
exports.get_password = function(req, res) {
    var query = connection.query('select password from User where username = ? ', req.params.username, function(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        if (result.length > 0) {
            return res.status(200).send(result[0].password);
        } else {
            return res.status(201).send('');
        }
    });
};

// Get emails from inbox for username
exports.get_inbox_emails = function(req, res) {
    var query = connection.query('select * from Inbox where receiver = ? ', req.params.username, function(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        if (result.length > 0) {
            return res.status(200).send(result);
        } else {
            return res.status(201).send('');
        }
    });
};

// Get email from inbox that detail is viewed
exports.get_inbox_email = function(req, res) {
    var query = connection.query('select * from Inbox where id = ?', req.params.id, function(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        if (result.length > 0) {
            return res.status(200).send(result[0]);
        } else {
            return res.status(201).send('');
        }
    });
};

// Get emails from outbox for username
exports.get_outbox_emails = function(req, res) {
    var query = connection.query('select * from Outbox where sender = ?', req.params.username, function(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        if (result.length > 0) {
            return res.status(200).send(result);
        } else {
            return res.status(201).send('');
        }
    });
};

// Get email from outbox that detail is viewed
exports.get_outbox_email = function(req, res) {
    var query = connection.query('select * from Outbox where id = ? ', req.params.id, function(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        if (result.length > 0) {
            return res.status(200).send(result[0]);
        } else {
            return res.status(201).send('');
        }
    });
};

// Get emails from draft for username
exports.get_draft_emails = function(req, res) {
    var query = connection.query('SELECT * FROM Draft WHERE sender = ?', req.params.username,
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(300).send('');
                }
            }
        });
};

// Get email from outbox that detail is viewed
exports.get_draft_email = function(req, res) {
    var query = connection.query('SELECT * FROM Draft WHERE id = ?', req.params.id,
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    return res.status(200).send(result[0]);
                } else {
                    return res.status(300).send('');
                }
            }
        });
};

// Add a New message
exports.send_email = function(req, res) {
    var query = connection.query('INSERT INTO Outbox SET ?', req.body, function(err, result) {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
};

// Save draft for the first time
exports.save_draft = function(req, res) {
    var query = connection.query('INSERT INTO Draft SET ?', req.body, function(err, result) {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
};

// Update draft
exports.update_draft = function(req, res) {
    var query = connection.query('UPDATE Draft SET ? WHERE id = ?', [req.body, req.params.id],
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).send(result);
            }
        });
};

// Delete draft after sending
exports.delete_draft = function(req, res) {
    var query = connection.query('DELETE FROM Draft WHERE id = ?', req.params.id,
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).send(result);
            }
        });
};
