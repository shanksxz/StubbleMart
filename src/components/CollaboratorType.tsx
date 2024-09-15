"use client"

import { useEffect, useState } from 'react'
import { Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { approveCollaborator, delCollaborator, getCollaboratorsByCategory } from '@/actions/collaborator'
import { getRecommendedStubblePurchasingCompanies } from '@/actions/admin'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type Crop = {
  id: string
  cropName: string
  priceRange: string
}

type CollaborationPartner = {
  id: string
  name: string
  companyName: string
  email: string
  phoneNumber: string | null
  companyAddress: string
  companyDescription: string | null
  query: string | null
  isApproved: boolean
  isActive: boolean
  crops: Crop[]
  priceCompetitiveness?: number
}

type CollaborationType = 'STUBBLE_PURCHASING_COMPANY' | 'MACHINE_RENTAL' | 'TRANSPORTATION_COMPANY' | 'AGRICULTURE_SHOPS'

type CollaborationPageProps = {
  type: CollaborationType
  title: string
}

export default function CollaboratorType({ type, title }: CollaborationPageProps) {
  const [partners, setPartners] = useState<CollaborationPartner[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<CollaborationPartner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recommendedCompanies, setRecommendedCompanies] = useState<CollaborationPartner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await getCollaboratorsByCategory({ category: type });
        if (res.success) {
          setPartners(res.collaborators as CollaborationPartner[]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch partners.");
      }
    }
    fetchPartners();

    if (type === 'STUBBLE_PURCHASING_COMPANY') {
      fetchRecommendedCompanies();
    }
  }, [type])

  const fetchRecommendedCompanies = async () => {
    try {
      const res = await getRecommendedStubblePurchasingCompanies();
      console.log("ress", res);

      if (res.success && res.companies && res.companies.length > 0) {
        setRecommendedCompanies(res.companies as CollaborationPartner[]);
      } else {
        setRecommendedCompanies([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch recommended companies.");
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const res = await approveCollaborator({ id });
      if (res.success) {
        setPartners(partners.map(partner =>
          partner.id === id ? { ...partner, isApproved: true } : partner
        ));
        setIsDialogOpen(false);
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("An error occurred while approving the collaborator.");
      console.error(error);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await delCollaborator({ id });
      if (res.success) {
        setPartners(partners.filter(partner => partner.id !== id));
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the collaborator.");
      console.error(error);
    }
  }

  const handleViewDetails = (partner: CollaborationPartner) => {
    setSelectedPartner(partner);
    setIsDialogOpen(true);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      
      {type === 'STUBBLE_PURCHASING_COMPANY' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Stubble Purchasing Companies Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  layout="vertical"
                  data={partners}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 1]} />
                  <YAxis dataKey="companyName" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="isActive" fill="#8884d8" name="Active Status" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Companies</CardTitle>
            </CardHeader>
            <CardContent>
              {recommendedCompanies.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recommendedCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>{company.companyName}</TableCell>
                        <TableCell>{company.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No recommended companies available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              {type === 'STUBBLE_PURCHASING_COMPANY' && <TableHead>Crops</TableHead>}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>{partner.companyName}</TableCell>
                <TableCell>{partner.email}</TableCell>
                <TableCell>{partner.isApproved ? 'Approved' : 'Pending'}</TableCell>
                {type === 'STUBBLE_PURCHASING_COMPANY' && (
                  <TableCell>
                    {partner.crops.map((crop) => (
                      <Badge key={crop.id} variant="secondary" className="mr-1 mb-1">
                        {crop.cropName}
                      </Badge>
                    ))}
                  </TableCell>
                )}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewDetails(partner)}
                    aria-label={`View details for ${partner.companyName}`}
                    className="mr-2"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(partner.id)}
                    aria-label={`Delete ${partner.companyName}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[725px] max-h-[80vh] p-0">
          <ScrollArea className="h-full max-h-[calc(80vh-2rem)]">
            <div className="p-6">
              <DialogHeader>
                <DialogTitle>Collaborator Details</DialogTitle>
              </DialogHeader>
              {selectedPartner && (
                <div className="grid gap-4 py-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <p className="font-semibold">Name:</p>
                        <p>{selectedPartner.companyName}</p>
                        <p className="font-semibold">Email:</p>
                        <p>{selectedPartner.email}</p>
                        <p className="font-semibold">Phone:</p>
                        <p>{selectedPartner.phoneNumber || 'N/A'}</p>
                        <p className="font-semibold">Address:</p>
                        <p>{selectedPartner.companyAddress}</p>
                        <p className="font-semibold">Description:</p>
                        <p>{selectedPartner.companyDescription || 'N/A'}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <p className="font-semibold">Username:</p>
                        <p>{selectedPartner.name}</p>
                        <p className="font-semibold">Query:</p>
                        <p>{selectedPartner.query || 'N/A'}</p>
                        <p className="font-semibold">Status:</p>
                        <p>{selectedPartner.isApproved ? 'Approved' : 'Pending'}</p>
                        <p className="font-semibold">Active:</p>
                        <p>{selectedPartner.isActive ? 'Yes' : 'No'}</p>
                      </div>
                    </CardContent>
                  </Card>
                  {type === 'STUBBLE_PURCHASING_COMPANY' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Crops</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Crop Name</TableHead>
                              <TableHead>Price Range</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedPartner.crops.map((crop) => (
                              <TableRow key={crop.id}>
                                <TableCell>{crop.cropName}</TableCell>
                                <TableCell>{crop.priceRange}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  )}
                  {!selectedPartner.isApproved && (
                    <Button onClick={() => handleApprove(selectedPartner.id)} className="mt-4">
                      Approve Collaborator
                    </Button>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}