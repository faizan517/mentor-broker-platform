import { create } from 'zustand';
import { DexaMessage } from '@types/index';

interface DexaState {
  messages: DexaMessage[];
  isOpen: boolean;
  currentContext?: string;
  isLoading: boolean;
  addMessage: (message: DexaMessage) => void;
  clearMessages: () => void;
  setOpen: (isOpen: boolean) => void;
  setContext: (context: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useDexaStore = create<DexaState>((set) => ({
  messages: [],
  isOpen: false,
  currentContext: undefined,
  isLoading: false,
  addMessage: (message: DexaMessage) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () =>
    set(() => ({
      messages: [],
    })),
  setOpen: (isOpen: boolean) =>
    set(() => ({
      isOpen,
    })),
  setContext: (context: string) =>
    set(() => ({
      currentContext: context,
    })),
  setLoading: (isLoading: boolean) =>
    set(() => ({
      isLoading,
    })),
}));
