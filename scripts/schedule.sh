#!/bin/sh

send_request() {
    echo "Sending POST request at $(date)"
    curl -X POST http://127.0.0.1:6235/punch
}

while true; do
    CURRENT_HOUR=$(date +"%H")

    if [ "$CURRENT_HOUR" -lt 8 ]; then
        # (8:00 - 8:29)
        RANDOM_MINUTE=$((RANDOM % 30))
        NEXT_RUN=$(date -d "08:$RANDOM_MINUTE" +%s)
    elif [ "$CURRENT_HOUR" -lt 19 ]; then
        # (19:00 - 23:00)
        RANDOM_HOUR=$((19 + RANDOM % 5))
        RANDOM_MINUTE=$((RANDOM % 60))
        NEXT_RUN=$(date -d "$RANDOM_HOUR:$RANDOM_MINUTE" +%s)
    else
        # After 23:00, set for tomorrow at 8:00
        NEXT_RUN=$(date -d "tomorrow 08:00" +%s)
    fi

    NOW=$(date +%s)
    WAIT_TIME=$((NEXT_RUN - NOW))

    if [ "$WAIT_TIME" -gt 0 ]; then
        echo "Next request scheduled at $(date -d @$NEXT_RUN)"
        sleep $WAIT_TIME
    fi

    send_request
done
