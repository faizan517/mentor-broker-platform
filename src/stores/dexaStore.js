import { create } from 'zustand';
export const useDexaStore = create((set) => ({
    messages: [],
    isOpen: false,
    currentContext: undefined,
    isLoading: false,
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
    })),
    clearMessages: () => set(() => ({
        messages: [],
    })),
    setOpen: (isOpen) => set(() => ({
        isOpen,
    })),
    setContext: (context) => set(() => ({
        currentContext: context,
    })),
    setLoading: (isLoading) => set(() => ({
        isLoading,
    })),
}));
