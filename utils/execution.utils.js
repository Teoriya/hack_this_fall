module.exports = {
    executeCode: async (code, language, stdInput) => {
        const resp = await fetch(process.env.EXECUTION_API || "https://codeploy-f46rfl3ysa-el.a.run.app/api/compiler", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, language, stdInput })
        })
        const data = await resp.json();
        return data;
    }
};