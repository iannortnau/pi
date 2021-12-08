

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getAvaliacoes();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function getMemoria() {

        return res.status(200);
    }
}
