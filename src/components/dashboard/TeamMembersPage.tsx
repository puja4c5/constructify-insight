
import { useState } from "react";
import { PlusCircle, User, Mail, Calendar, MoreHorizontal, Trash2, UserPlus, Shield, ShieldCheck, ShieldX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for team members
const initialTeamMembers = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    role: "Admin",
    joinedDate: "Jan 10, 2023",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    role: "Project Manager",
    joinedDate: "Mar 15, 2023",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    role: "Engineer",
    joinedDate: "May 22, 2023",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "4",
    name: "Sunita Reddy",
    email: "sunita.reddy@example.com",
    role: "Site Inspector",
    joinedDate: "Jul 08, 2023",
    status: "inactive",
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    role: "Project Manager",
    joinedDate: "Sep 30, 2023",
    status: "active",
    avatarUrl: "https://randomuser.me/api/portraits/men/66.jpg",
  },
];

const TeamMembersPage = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [filteredMembers, setFilteredMembers] = useState(initialTeamMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMemberDialog, setNewMemberDialog] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(query.toLowerCase()) ||
        member.email.toLowerCase().includes(query.toLowerCase()) ||
        member.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Generate a random avatar for the new member
    const gender = Math.random() > 0.5 ? "men" : "women";
    const randomNum = Math.floor(Math.random() * 99);
    
    const newTeamMember = {
      id: (teamMembers.length + 1).toString(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      joinedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "active",
      avatarUrl: `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`,
    };

    setTeamMembers([...teamMembers, newTeamMember]);
    setFilteredMembers([...teamMembers, newTeamMember]);
    setNewMember({ name: "", email: "", role: "" });
    setNewMemberDialog(false);

    toast({
      title: "Team member added",
      description: `${newTeamMember.name} has been added to the team`,
    });
  };

  const handleRemoveMember = (id: string) => {
    const updatedMembers = teamMembers.filter((member) => member.id !== id);
    setTeamMembers(updatedMembers);
    setFilteredMembers(updatedMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
    ));

    toast({
      title: "Team member removed",
      description: "The team member has been removed",
    });
  };

  const handleChangeStatus = (id: string, status: string) => {
    const updatedMembers = teamMembers.map((member) =>
      member.id === id ? { ...member, status } : member
    );
    setTeamMembers(updatedMembers);
    setFilteredMembers(updatedMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
    ));

    toast({
      title: "Status updated",
      description: `Team member status changed to ${status}`,
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            <Shield className="h-3 w-3 mr-1" /> {role}
          </Badge>
        );
      case "Project Manager":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <ShieldCheck className="h-3 w-3 mr-1" /> {role}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            {role}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Team Members</h2>
        <Dialog open={newMemberDialog} onOpenChange={setNewMemberDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Invite a new member to join your construction project team.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  onValueChange={(value) =>
                    setNewMember({ ...newMember, role: value })
                  }
                  value={newMember.role}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                    <SelectItem value="Engineer">Engineer</SelectItem>
                    <SelectItem value="Site Inspector">Site Inspector</SelectItem>
                    <SelectItem value="Contractor">Contractor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewMemberDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center mb-6">
        <Input
          placeholder="Search team members..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No team members found
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(member.role)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{member.joinedDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === "active" ? "default" : "secondary"}
                      className={
                        member.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {member.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            // Copy email to clipboard
                            navigator.clipboard.writeText(member.email);
                            toast({
                              title: "Email copied",
                              description: "Email address copied to clipboard",
                            });
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" /> Copy email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleChangeStatus(
                              member.id,
                              member.status === "active" ? "inactive" : "active"
                            )
                          }
                        >
                          {member.status === "active" ? (
                            <>
                              <ShieldX className="h-4 w-4 mr-2" /> Set as inactive
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="h-4 w-4 mr-2" /> Set as active
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TeamMembersPage;
