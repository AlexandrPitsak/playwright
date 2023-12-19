import { UserData } from "../types/userType.ts";

export const TEST_USER_2: UserData = {
    email: 'bot@supermetrics.team',
    password: process.env.E2E_PASSWORD!,
    userId: '438272',
    team: 'E2E_TEST_TEAM_2'
};