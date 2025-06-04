# Quote Scoring Logic

The AI score for a quote is calculated as:

```
score = 0.5 * price + 0.3 * deliveryDays + 0.2 * (1 - rating/5)
```

Lower scores are better. The lowest price quote is flagged as `isLowest` and the quote with the best score is flagged as `isRecommended`.
