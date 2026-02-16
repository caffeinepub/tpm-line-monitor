import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  // Storage for user profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };

    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    userProfiles.add(caller, profile);
  };

  // Promote another user to admin - ADMIN ONLY
  public shared ({ caller }) func promoteToAdmin(target : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can promote users to admin");
    };
    if (target == caller) {
      Runtime.trap("Cannot promote yourself using this function");
    };
    // AccessControl.assignRole already includes admin-only guard, but we check explicitly for clarity
    AccessControl.assignRole(accessControlState, caller, target, #admin);
  };

  // Search for users by exact name match - ADMIN ONLY
  public query ({ caller }) func getUsersByExactName(name : Text) : async [(Principal, UserProfile)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can search users by name");
    };

    let filteredProfiles = userProfiles.filter(
      func(_, profile) { profile.name == name }
    );

    filteredProfiles.toArray();
  };
};
