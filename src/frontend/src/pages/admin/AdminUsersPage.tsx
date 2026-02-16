import { useState } from 'react';
import WireframeSection from '../../components/common/WireframeSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, CheckCircle2, AlertCircle } from 'lucide-react';
import { useGetUsersByExactName, usePromoteToAdmin } from '../../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function AdminUsersPage() {
  const [searchName, setSearchName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { identity } = useInternetIdentity();
  const currentUserPrincipal = identity?.getPrincipal().toString();

  const { data: searchResults, isLoading: isSearching, error: searchError } = useGetUsersByExactName(searchQuery);
  const promoteToAdminMutation = usePromoteToAdmin();

  const handleSearch = () => {
    setSearchQuery(searchName.trim());
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handlePromoteToAdmin = async (principal: string, name: string) => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Convert string principal to Principal object
      const { Principal } = await import('@dfinity/principal');
      const targetPrincipal = Principal.fromText(principal);
      
      await promoteToAdminMutation.mutateAsync(targetPrincipal);
      setSuccessMessage(`${name} has been successfully promoted to Admin!`);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to promote user to admin');
    }
  };

  const isCurrentUser = (principal: string) => {
    return principal === currentUserPrincipal;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">User Management</h2>
        <p className="text-muted-foreground text-lg">Search for users and manage admin roles</p>
      </div>

      {successMessage && (
        <Alert className="bg-success/10 border-success">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <AlertDescription className="text-success font-medium">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      <WireframeSection 
        title="Search Users" 
        description="Search for a user by their exact profile name to manage their admin status"
      >
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="searchName">User Name</Label>
              <Input
                id="searchName"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter exact user name (e.g., Uday Chougule)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch} 
                size="lg" 
                className="gap-2"
                disabled={!searchName.trim() || isSearching}
              >
                <Search className="h-5 w-5" />
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>

          {searchError && (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>
                {searchError instanceof Error ? searchError.message : 'Failed to search users'}
              </AlertDescription>
            </Alert>
          )}

          {searchQuery && !isSearching && searchResults && (
            <div className="mt-6">
              {searchResults.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No user found with the name "{searchQuery}"
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Principal ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map(([principal, profile]) => {
                      const principalString = principal.toString();
                      const isSelf = isCurrentUser(principalString);
                      
                      return (
                        <TableRow key={principalString}>
                          <TableCell className="font-medium">
                            {profile.name}
                            {isSelf && (
                              <Badge variant="outline" className="ml-2">You</Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">
                            {principalString.slice(0, 20)}...
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">User</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => handlePromoteToAdmin(principalString, profile.name)}
                              disabled={promoteToAdminMutation.isPending || isSelf}
                              size="lg"
                              className="gap-2"
                            >
                              <UserPlus className="h-5 w-5" />
                              {promoteToAdminMutation.isPending ? 'Promoting...' : 'Make Admin'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          )}
        </div>
      </WireframeSection>

      <WireframeSection 
        title="Quick Actions" 
        description="Common user searches"
      >
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              setSearchName('Uday Chougule');
              setSearchQuery('Uday Chougule');
              setSuccessMessage('');
              setErrorMessage('');
            }}
          >
            Search for Uday Chougule
          </Button>
        </div>
      </WireframeSection>
    </div>
  );
}
