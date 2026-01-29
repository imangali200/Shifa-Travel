import { useQuery } from "@tanstack/react-query";
import { Tour } from "../types/tour";

async function fetchTours(): Promise<Tour[]> {
    const response = await fetch("/api/tours");
    if (!response.ok) {
        throw new Error("Failed to fetch tours");
    }
    return response.json();
}

export function useTours() {
    return useQuery<Tour[]>({
        queryKey: ["/api/tours"],
        queryFn: fetchTours,
    });
}
