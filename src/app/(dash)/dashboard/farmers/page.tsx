"use client"

import { useState, useEffect } from 'react'
import { getUsersWhoOrdered } from "@/actions/admin"
import { Users, Trash2, Eye, User, MapPin, Phone, Mail, Calendar, Box } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { delOrder } from '@/actions/order'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

type OrderWithUser = {
    id: string;
    state: string;
    city: string;
    landSize: string;
    serviceType: string[];
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: {
        id: string;
        name: string | null;
        email: string | null;
        phoneNumber: string | null;
        address: string | null;
    };
    orderItems: {
        id: string;
        quantity: number;
        product: {
            id: string;
            imgUrl: string;
            title: string;
            description: string;
            priceRange: string;
        };
    }[];
}

export default function FarmersPage() {
    const [orders, setOrders] = useState<OrderWithUser[]>([])
    const [selectedOrder, setSelectedOrder] = useState<OrderWithUser | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUsersWhoOrdered();
            console.log(res)
            if (res.success && res.orders) {
                //TODO: Fix this type casting
                setOrders(res.orders as any)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            const res = await delOrder(id);
            if (res.success) {
                setOrders(orders.filter(order => order.id !== id))
                toast.success("Order deleted successfully")
            }
        } catch (error) {
            toast.error("An error occurred while deleting the order")
            console.error("An error occurred while deleting the order:", error)
        }
    }

    const handleViewDetails = (order: OrderWithUser) => {
        setSelectedOrder(order)
        setIsDialogOpen(true)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center">
                <Users className="mr-2 h-6 w-6 sm:h-8 sm:w-8" />
                Registered Farmers
            </h1>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.user.email}</TableCell>
                                <TableCell>{order.state}</TableCell>
                                <TableCell>{order.city}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleViewDetails(order)}
                                        aria-label={`View details for farmer ${order.user.email}`}
                                        className="mr-2"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(order.id)}
                                        aria-label={`Delete order for ${order.user.email}`}
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
                                <DialogTitle>Farmer Details</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                                <div className="grid gap-4 py-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>User Information</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-[20px_1fr] gap-4">
                                                <User className="h-5 w-5" />
                                                <p>{selectedOrder.user.name || 'N/A'}</p>
                                                <Mail className="h-5 w-5" />
                                                <p>{selectedOrder.user.email || 'N/A'}</p>
                                                <Phone className="h-5 w-5" />
                                                <p>{selectedOrder.user.phoneNumber || 'N/A'}</p>
                                                <MapPin className="h-5 w-5" />
                                                <p>{selectedOrder.user.address || 'N/A'}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Order Details</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-[20px_1fr] gap-4">
                                                <MapPin className="h-5 w-5" />
                                                <p>{selectedOrder.state}, {selectedOrder.city}</p>
                                                <Box className="h-5 w-5" />
                                                <p>Land Size: {selectedOrder.landSize}</p>
                                                <Users className="h-5 w-5" />
                                                <div>
                                                    {selectedOrder.serviceType.map((service, index) => (
                                                        <Badge key={index} variant="secondary" className="mr-2 mb-2">
                                                            {service}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <Calendar className="h-5 w-5" />
                                                <p>Ordered: {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Products Ordered</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {selectedOrder.orderItems.map((item) => (
                                                <div key={item.id} className="flex items-center space-x-4 mb-4">
                                                    <img 
                                                        src={item.product.imgUrl} 
                                                        alt={item.product.title} 
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{item.product.title}</p>
                                                        <p className="text-sm text-gray-500">{item.product.description}</p>
                                                        <p className="font-bold mt-1">
                                                            $ {item.product.priceRange}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    )
}