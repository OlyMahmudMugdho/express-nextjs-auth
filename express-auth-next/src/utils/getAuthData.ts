export async function getAuthData() {
    const url = 'http://localhost:8081/api/check-auth';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        if (json.success === true) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}
