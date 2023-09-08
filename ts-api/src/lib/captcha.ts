async function validateCaptcha(token:string) {

    let formData = new FormData();
    formData.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
	formData.append('response', token);
    // formData.append('response', '123')

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const outcome = await result.json();
	if (!outcome.success) {
        return false
	}

    return true

}

// export functions
export { validateCaptcha }