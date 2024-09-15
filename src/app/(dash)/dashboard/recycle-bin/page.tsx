"use client"

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { getDeletedCollaborators, restoreCollaborator } from '@/actions/collaborator'
import { $Enums, CollaborationType } from '@prisma/client'

type DeletedCollaborator = {
  id: string
  companyName: string
  email: string
  collaborationType: $Enums.CollaborationType
  deletedAt: Date | null
}

export default function RecycleBin() {
  const [deletedCollaborators, setDeletedCollaborators] = useState<DeletedCollaborator[]>([])

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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestore(collaborator.id)}
                  >
                    Restore
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}