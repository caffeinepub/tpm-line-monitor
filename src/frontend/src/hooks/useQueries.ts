import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile } from '../backend';
import type { Principal } from '@dfinity/principal';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['currentUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useGetUsersByExactName(name: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Array<[Principal, UserProfile]>>({
    queryKey: ['usersByName', name],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getUsersByExactName(name);
      } catch (error: any) {
        if (error.message?.includes('Unauthorized')) {
          throw new Error('Only admins can search for users');
        }
        throw error;
      }
    },
    enabled: !!actor && !actorFetching && name.trim().length > 0,
    retry: false,
  });
}

export function usePromoteToAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (targetPrincipal: Principal) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.promoteToAdmin(targetPrincipal);
      } catch (error: any) {
        if (error.message?.includes('Unauthorized')) {
          throw new Error('Only admins can promote users to admin');
        }
        if (error.message?.includes('Cannot promote yourself')) {
          throw new Error('You cannot promote yourself using this function');
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersByName'] });
      queryClient.invalidateQueries({ queryKey: ['isCallerAdmin'] });
    },
  });
}
