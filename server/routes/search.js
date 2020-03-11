const router = require('express').Router();
const algoliaSearch = require('algoliasearch');

// mongoose-algolia -> sync document to your algolia db
// algoliaSearch -> search data in your algolia db
const client = algoliaSearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_SECRET_KEY,
)

const index = client.initIndex(process.env.ALGOLIA_INDEX);

/* Create search */
router.post('/search', async (req, res) => {
    try {
        let result = await index.search(req.body.title);
        res.json(result.hits)
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;