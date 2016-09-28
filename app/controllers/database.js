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
    var query = connection.query('select * from Outbox where sender = ?', req.params.username,
        function(err, result) {
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
    var query = connection.query('select * from Outbox where id = ? ', req.params.id,
        function(err, result) {
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
                    return res.status(201).send('');
                }
            }
        });
};

// Get email from draft that detail is viewed
exports.get_draft_email = function(req, res) {
    var query = connection.query('SELECT * FROM Draft WHERE id = ?', req.params.id,
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    return res.status(200).send(result[0]);
                } else {
                    return res.status(201).send('');
                }
            }
        });
};

//  Get emails from trash
exports.get_trash_emails = function(req, res) {
    var query = connection.query('SELECT * FROM Trash',
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(201).send('');
                }
            }
        });
};

// Get email from trash that detail is viewed
exports.get_trash_email = function(req, res) {
    var query = connection.query('SELECT * FROM Trash WHERE id = ?', req.params.id,
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    return res.status(200).send(result[0]);
                } else {
                    return res.status(201).send('');
                }
            }
        });
};

// Add a New message
exports.send_email = function(req, res) {
    // Delete id and source field if restore from trash
    delete req.body.id;
    delete req.body.source;

    // Check whether new outbox mail or restore to set datetime
    req.body.datetime = typeof req.body.time === 'undefined' ?
        new Date() : new Date(req.body.datetime);

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
    // Delete id and source field if restore from trash
    delete req.body.id;
    delete req.body.source;

    // Check whether new draft or restore to set datetime
    req.body.datetime = typeof req.body.time === 'undefined' ?
        new Date() : new Date(req.body.datetime);

    var query = connection.query('INSERT INTO Draft SET ?', req.body, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(400).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
};

// Save email into Inbox table
exports.save_inbox = function(req, res) {
    // Delete id and source field if restore from trash
    delete req.body.id;
    delete req.body.source;
    req.body.datetime = new Date(req.body.datetime);

    var query = connection.query('INSERT INTO Inbox SET ?', req.body, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(400).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
};

// Send deleted mail to trash
exports.send_to_trash = function(req, res) {
    delete req.body.id;
    delete req.body.star;
    req.body.datetime = new Date(req.body.datetime);
    var query = connection.query('INSERT INTO Trash SET ?', req.body, function(err, result) {
        if (err) {
	    console.error(err);
            return res.status(400).send(err);
        } else {
            return res.status(200).send(result);
        }
    })
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

// Delete draft mail by id
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

// Delete inbox mail by id
exports.delete_inbox = function(req, res) {
    var query = connection.query('DELETE FROM Inbox WHERE id = ?', req.params.id,
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).send(result);
            }
        });
};

// Delete outbox mail by id
exports.delete_outbox = function(req, res) {
    var query = connection.query('DELETE FROM Outbox WHERE id = ?', req.params.id,
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).send(result);
            }
        });
};

exports.delete_trash = function(req, res) {
    var query = connection.query('DELETE FROM Trash WHERE id = ?', req.params.id,
        function(err, result) {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).send(result);
            }
        });
};

// Get Starred emails from Inbox, Outbox, Draft
exports.get_star_emails = function(req, res) {
    var query = connection.query('SELECT * FROM Inbox WHERE star = 1 UNION SELECT * FROM Outbox '
		+ 'WHERE star = 1 UNION SELECT * FROM Draft WHERE star = 1', 
		function(err, result) {
	    	if (err) {
				return res.status(400).send(err);
	    	} else {
				if (result.length > 0) {
		    		return res.status(200).send(result);
				} else {
					return res.status(201).send('');
				}
			}
		});
};


// Update Inbox, star = 1, star the email
exports.star_on_inbox = function(req, res) {
	var query = connection.query('UPDATE Inbox SET star = 1 WHERE id = ?', req.params.id,
		function(err, result) {
			if (err) {
				return res.status(400).send(err);			
			} else {
				return res.status(200).send(result);			
			}
		}
	);
};

// Update Inbox, star = 0, unstar
exports.star_off_inbox = function(req, res) {
	var query = connection.query('UPDATE Inbox SET star = 0 WHERE id = ?', req.params.id,
		function(err, result) {
			if (err) {
				return res.status(400).send(err);				
			} else {
				return res.status(200).send(result);
			}
	});
};

// Update Outbox, star = 1, star the email
exports.star_on_outbox = function(req, res) {
	var query = connection.query('UPDATE Outbox SET star = 1 WHERE id = ?', req.params.id,
		function(err, result) {
			if (err) {
				return res.status(400).send(err);			
			} else {
				return res.status(200).send(result);			
			}
		}
	);
};

// Update Outbox, star = 0, unstar
exports.star_off_outbox = function(req, res) {
	var query = connection.query('UPDATE Outbox SET star = 0 WHERE id = ?', req.params.id,
		function(err, result) {
			if (err) {
				return res.status(400).send(err);				
			} else {
				return res.status(200).send(result);
			}
	});
};

// Update Draft, star = 1, star the email
exports.star_on_draft = function(req, res) {
	var query = connection.query('UPDATE Draft SET star = 1 WHERE id = ?', req.params.id,
		function(err, result) {
			if (err) {
				return res.status(400).send(err);			
			} else {
				return res.status(200).send(result);			
			}
		}
	);
};

// Update Draft, star = 0, unstar
exports.star_off_draft = function(req, res) {
	var query = connection.query('UPDATE Draft SET star = 0 WHERE id = ?', req.params.id,
		function(err, result) {
			if (err) {
				return res.status(400).send(err);				
			} else {
				return res.status(200).send(result);
			}
	});
};
