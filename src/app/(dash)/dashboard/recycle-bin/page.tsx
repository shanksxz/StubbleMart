"use client"

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { getDeletedCollaborators, restoreCollaborator, permanentlyDeleteCollaborator } from '@/actions/collaborator'
import { $Enums, CollaborationType } from '@prisma/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type DeletedCollaborator = {
  id: string
  companyName: string
  email: string
  collaborationType: $Enums.CollaborationType
  deletedAt: Date | null
}

export default function RecycleBin() {
  const [deletedCollaborators, setDeletedCollaborators] = useState<DeletedCollaborator[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [collaboratorToDelete, setCollaboratorToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchDeletedCollaborators()
  }, [])

  const fetchDeletedCollaborators = async () => {
    try {
      const res = await getDeletedCollaborators()
      if (res.success) {
        setDeletedCollaborators(res.collaborators!)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch deleted collaborators.")
    }
  }

  const handleRestore = async (id: string) => {
    try {
      const res = await restoreCollaborator({ id })
      if (res.success) {
        setDeletedCollaborators(deletedCollaborators.filter(c => c.id !== id))
        toast.success("Collaborator restored successfully.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to restore collaborator.")
    }
  }

  const handlePermanentDelete = async () => {
    if (collaboratorToDelete) {
      try {
        const res = await permanentlyDeleteCollaborator({ id: collaboratorToDelete })
        if (res.success) {
          setDeletedCollaborators(deletedCollaborators.filter(c => c.id !== collaboratorToDelete))
          toast.success("Collaborator permanently deleted.")
        }
      } catch (error) {
        console.error(error)
        toast.error("Failed to permanently delete collaborator.")
      } finally {
        setIsDeleteDialogOpen(false)
        setCollaboratorToDelete(null)
      }
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Recycle Bin</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Deleted At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deletedCollaborators && deletedCollaborators.map((collaborator) => (
              <TableRow key={collaborator.id}>
                <TableCell>{collaborator.companyName}</TableCell>
                <TableCell>{collaborator.email}</TableCell>
                <TableCell>{collaborator.collaborationType}</TableCell>
                <TableCell>{new Date(collaborator.deletedAt!).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className=' border-primary-green text-primary-green'
                      onClick={() => handleRestore(collaborator.id)}
                    >
                      Restore
                    </Button>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setCollaboratorToDelete(collaborator.id)}
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Permanent Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to permanently delete this collaborator? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                          <Button variant="destructive" onClick={handlePermanentDelete}>Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}