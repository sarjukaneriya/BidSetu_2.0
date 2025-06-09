# AI Quote Scoring Logic

The quote scoring module evaluates quotes based on price and delivery days.
Scores are normalized between 0 and 1. Lower price and shorter delivery yield a higher score.
The quote with the highest score is flagged as `isRecommended`.
