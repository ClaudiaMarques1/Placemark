import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testReviews, dublin, cork, review1 } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Review Model tests", () => { // This is the test Model for Review that was added to Placemark

    let dublinList = null;

    setup(async () => { // This is the setup for the reviews before testing them.
        db.init("mongo");
        await db.placemarkStore.deleteAllPlacemarks();
        // await db.reviewStore.deleteAllReviews();
        dublinList = await db.placemarkStore.addPlacemark(dublin);
        for (let i = 0; i < testReviews.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testReviews[i] = await db.reviewStore.addReview(dublinList._id, testReviews[i]);
        }
    });

    test("create single Review", async () => { // this is a test to add a review to placemark. Adding Review1 in Fixtures.js to Cork Favourites Placemark
        const corkList = await db.placemarkStore.addPlacemark(cork);
        const review = await db.reviewStore.addReview(corkList._id, review1)
        assert.isNotNull(review._id);
        assertSubset(review1, review);
    });

    test("get multiple reviews", async () => { // add multiple reviews to the Dublin Favourites Placemark.
        const reviews = await db.reviewStore.getReviewsByPlacemarkId(dublinList._id);
        assert.equal(testReviews.length, testReviews.length)
    });

    test("get a review - success", async () => {
        const corkList = await db.placemarkStore.addPlacemark(cork);
        const review = await db.reviewStore.addReview(corkList._id, review1)
        const newReview = await db.reviewStore.getReviewById(review._id);
        assertSubset(review1, newReview);
    });

    test("get a review - bad params", async () => {
        //assert.isNull(await db.reviewStore.getReviewById(""));
        assert.isNull(await db.reviewStore.getReviewById());
    });
});