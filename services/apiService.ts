import { User, FuelRequest, FuelType, Coordinates, UserRole, RequestStatus } from "../types";

// Mock Database
const MOCK_USERS: User[] = [
    { id: 'user-1', email: 'rider@example.com', roles: ['RIDER'] },
    { id: 'user-2', email: 'admin@example.com', roles: ['ADMIN'] },
    { id: 'user-3', email: 'superadmin@example.com', roles: ['SUPER_ADMIN'] },
    { id: 'user-4', email: 'multi@example.com', roles: ['RIDER', 'ADMIN'] },
];

const MOCK_REQUESTS: FuelRequest[] = [
    { id: 'req-1', userId: 'user-1', fuelType: 'Petrol', quantity: 10, location: { latitude: 12.9716, longitude: 77.5946 }, status: 'Pending', createdAt: new Date(Date.now() - 5 * 60000) },
    { id: 'req-2', userId: 'user-4', fuelType: 'Diesel', quantity: 25, location: { latitude: 12.9716, longitude: 77.5946 }, status: 'En Route', createdAt: new Date(Date.now() - 15 * 60000) },
];

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (email: string, password_unused: string): Promise<User> => {
    await simulateDelay(500);
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
    throw new Error('Invalid credentials');
};

export const signup = async (email: string, password_unused: string, role: UserRole): Promise<User> => {
    await simulateDelay(500);
    if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('User already exists');
    }
    const newUser: User = { id: `user-${Date.now()}`, email, roles: [role] };
    MOCK_USERS.push(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
};

export const logout = async (): Promise<void> => {
    await simulateDelay(200);
    localStorage.removeItem('currentUser');
};

export const fetchCurrentUser = async (): Promise<User | null> => {
    await simulateDelay(300);
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
};

export const createFuelRequest = async (fuelType: FuelType, quantity: number, location: Coordinates, user: User): Promise<FuelRequest> => {
    await simulateDelay(1000);
    const newRequest: FuelRequest = {
        id: `req-${Date.now()}`,
        userId: user.id,
        fuelType,
        quantity,
        location,
        status: 'Pending',
        createdAt: new Date(),
        user: { email: user.email },
    };
    MOCK_REQUESTS.unshift(newRequest);
    return newRequest;
};

export const fetchFuelRequests = async (): Promise<FuelRequest[]> => {
    await simulateDelay(500);
    return MOCK_REQUESTS;
};

export const updateRequestStatus = async (requestId: string, status: RequestStatus): Promise<FuelRequest> => {
    await simulateDelay(300);
    const request = MOCK_REQUESTS.find(r => r.id === requestId);
    if (!request) throw new Error('Request not found');
    request.status = status;
    return request;
};

export const fetchAllUsers = async (): Promise<User[]> => {
    await simulateDelay(500);
    return MOCK_USERS;
}

export const updateUserRoles = async (userId: string, roles: UserRole[]): Promise<User> => {
    await simulateDelay(300);
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    user.roles = roles;
    return user;
}
