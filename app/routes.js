// Import Controller modules
var database = require("./controllers/database");

// Export all of the routes back to the application
module.exports = function(app) {
    // The prefix that every route will start with.
    var prefix = "/api";

    // Front-end routes =========================================================
    // route to handle all angular requests from browser
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/app/index.html');
    });

    // API Get Endpoints
    app.get(prefix + "/password/:username", database.get_password);

    app.get(prefix + "/inbox/:username", database.get_inbox_emails);
    app.get(prefix + "/inbox/detail/:id", database.get_inbox_email);

    app.get(prefix + "/outbox/:username", database.get_outbox_emails);
    app.get(prefix + "/outbox/detail/:id", database.get_outbox_email);

    app.get(prefix + "/draft/:username", database.get_draft_emails);
    app.get(prefix + "/draft/detail/:id",  database.get_draft_email);

    app.get(prefix + "/trash/:username", database.get_trash_emails);
    app.get(prefix + "/trash/detail/:id", database.get_trash_email);

    // API Put Endpoints
    app.put(prefix + "/draft/:id", database.update_draft);

    // API Post Endpoints
    app.post(prefix + "/outbox/",  database.send_email);
    app.post(prefix + "/draft/", database.save_draft);
    app.post(prefix + "/trash/",  database.send_to_trash);
    // API Delete Endpoints
    app.delete(prefix + "/draft/:id", database.delete_draft);
    app.delete(prefix + "/inbox/:id", database.delete_inbox);
    app.delete(prefix + "/outbox/:id", database.delete_outbox);
};
