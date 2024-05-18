type IncomeEvent = {
    event_id: string;
    amount: number;
    currency: string;
    to_user_id: string;
    created_at: number;
    updated_at: number;
    from_user: {
        user_id: string | null;
        email: string;
        username?: string | null;
    };
    meta?: {
        message?: string;
        source: "stripe";
    };
    event_type: 0; // 0 = tip ... more later
}