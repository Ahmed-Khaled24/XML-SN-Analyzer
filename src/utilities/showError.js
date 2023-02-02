const { dialog, shell } = require('electron');

function error(title, err) {
	dialog.showErrorBox(title, err);
}

function errorWithLink(title, err, link) {
	const buttonIndex = dialog.showMessageBoxSync({
		title: title,
		type: 'error',
		message: err,
		buttons: ['OK', 'Help'],
	});

	if (buttonIndex === 1) {
		// Help button
		shell.openExternal(link);
	}
}

module.exports = {
	error,
	errorWithLink,
};
