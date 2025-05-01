// // "use client"

// // import { useState, useEffect } from "react"
// // import { useRouter } from "next/navigation"
// // import { ethers } from "ethers"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import { Button } from "@/components/ui/button"
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { motion } from "framer-motion"
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
// // import { 
// //   ArrowUpRight, Users, Package, MessageSquare, HeartHandshake, 
// //   Loader2, CheckCircle2, Clock, AlertCircle, IndianRupee, Receipt, History
// // } from "lucide-react"
// // import contractABI from "@/lib/abi.json"
// // import { useAuth } from "@/lib/auth-context"

// // const CONTRACT_ADDRESS = "0x1c61F82aad05c30190C211c1E28f2dE28f1f8Ab8" // Replace with actual contract address

// // const container = {
// //   hidden: { opacity: 0 },
// //   show: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.1,
// //     },
// //   },
// // }

// // const item = {
// //   hidden: { opacity: 0, y: 20 },
// //   show: { opacity: 1, y: 0 },
// // }

// // export default function Dashboard() {
// //   const router = useRouter()
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState(null)
// //   const [success, setSuccess] = useState(null)
// //   const [userData, setUserData] = useState(null)
// //   const [userRations, setUserRations] = useState([])
// //   const [userDeliveries, setUserDeliveries] = useState([])
// //   const [activeTab, setActiveTab] = useState("overview")
// //   const [paymentDialog, setPaymentDialog] = useState(false)
// //   const [paymentAmount, setPaymentAmount] = useState("0")
// //   const [selectedRation, setSelectedRation] = useState(null)
// //   const [paying, setPaying] = useState(false)
// //   const [txHistory, setTxHistory] = useState([])
  
// //   // New state for payment notifications
// //   const [newAllocationNotice, setNewAllocationNotice] = useState(null)
// //   const [checkingNotifications, setCheckingNotifications] = useState(false)

// //   // Auth context would typically provide this
// //   const [provider, setProvider] = useState(null)
// //   const [userAddress, setUserAddress] = useState(null)
// //   const [userId, setUserId] = useState(null)
// //   const [isConnected, setIsConnected] = useState(false)

// //   // Initialize provider and check if user is authenticated
// //   useEffect(() => {
// //     const initProvider = async () => {
// //       try {
// //         // Check if window is defined (browser environment)
// //         if (typeof window !== "undefined" && window.ethereum) {
// //           const ethProvider = window.ethereum;
          
// //           // Request account access
// //           const accounts = await ethProvider.request({ method: "eth_requestAccounts" });
// //           const address = accounts[0];
// //           setUserAddress(address);
          
// //           // Create ethers provider
// //           const provider = new ethers.BrowserProvider(ethProvider);
// //           setProvider(provider);

// //           // Get contract
// //           const signer = await provider.getSigner();
// //           const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
          
// //           try {
// //             // Check if user exists
// //             const userId = await contract.getUserIdByAddress(address);
// //             if (userId && Number(userId) > 0) {
// //               setUserId(Number(userId));
// //               setIsConnected(true);
// //               fetchUserData(contract, Number(userId));
// //             } else {
// //               setError("You are not registered as a user. Please register first.");
// //               router.push('/');
// //             }
// //           } catch (error) {
// //             console.error("Error checking user:", error);
// //             setError("You are not registered as a user. Please register first.");
// //             router.push('/');
// //           }
// //         } else {
// //           setError("Please install MetaMask to use this application");
// //         }
// //       } catch (error) {
// //         console.error("Error initializing provider:", error);
// //         setError("Failed to connect wallet. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     initProvider();
// //   }, [router]);

// //   // Check for new payment notifications
// //   useEffect(() => {
// //     if (!userId) return;
    
// //     const checkForNotifications = () => {
// //       setCheckingNotifications(true);
// //       try {
// //         // Get notifications from localStorage
// //         const notifications = JSON.parse(localStorage.getItem('rationchain-payment-notifications') || '[]');
        
// //         // Find unread notifications for this user
// //         const myNotifications = notifications.filter(n => 
// //           n.userId == userId && !n.read
// //         );
        
// //         // If there are notifications, show the first one
// //         if (myNotifications.length > 0) {
// //           setNewAllocationNotice(myNotifications[0]);
          
// //           // Mark as read
// //           const updatedNotifications = notifications.map(n => {
// //             if (n.id === myNotifications[0].id) {
// //               return { ...n, read: true };
// //             }
// //             return n;
// //           });
          
// //           // Save back to localStorage
// //           localStorage.setItem('rationchain-payment-notifications', JSON.stringify(updatedNotifications));
// //         }
// //       } catch (error) {
// //         console.error("Error checking notifications:", error);
// //       } finally {
// //         setCheckingNotifications(false);
// //       }
// //     };
    
// //     // Check immediately
// //     checkForNotifications();
    
// //     // Set up interval to check regularly (every 5 seconds)
// //     const interval = setInterval(checkForNotifications, 5000);
// //     return () => clearInterval(interval);
// //   }, [userId]);

// //   // Fetch user data from blockchain
// //   const fetchUserData = async (contract, userId) => {
// //     try {
// //       setLoading(true);
      
// //       // Get user details
// //       const userDetails = await contract.getUserDetails(userId);
// //       setUserData({
// //         id: userId,
// //         name: userDetails.name,
// //         category: Number(userDetails.category),
// //         depotId: Number(userDetails.assignedDepotId),
// //         walletAddress: userDetails.walletAddress,
// //         lastRationDate: userDetails.lastRationDate ? new Date(Number(userDetails.lastRationDate) * 1000).toISOString() : null
// //       });
      
// //       // Get user deliveries
// //       const deliveries = await contract.getUserDeliveries(userId);
      
// //       // Process deliveries to identify rations
// //       const processedDeliveries = deliveries.map(delivery => ({
// //         id: String(delivery.id),
// //         depotId: String(delivery.depotId),
// //         deliveryPersonId: String(delivery.deliveryPersonId),
// //         status: delivery.status,
// //         date: new Date(Number(delivery.timestamp) * 1000).toISOString(),
// //         isPaid: delivery.isPaid
// //       }));
      
// //       setUserDeliveries(processedDeliveries);
      
// //       // Mock rations data (in a real app, you'd get this from blockchain events or backend)
// //       const mockRations = [
// //         {
// //           id: "RAT1",
// //           depotId: userDetails.assignedDepotId,
// //           depotName: "Local Depot",
// //           date: new Date().toISOString(),
// //           status: "allocated",
// //           isPaid: false,
// //           amount: "0.01",
// //           items: [
// //             { name: "Rice", quantity: "5kg" },
// //             { name: "Wheat", quantity: "3kg" },
// //             { name: "Sugar", quantity: "1kg" },
// //             { name: "Oil", quantity: "1L" }
// //           ]
// //         }
// //       ];
      
// //       // In a real implementation, you would fetch actual ration allocations
// //       // For now, we'll use mock data
// //       setUserRations(mockRations);
      
// //       // Mock transaction history
// //       const mockTxHistory = [
// //         {
// //           type: "Payment",
// //           timestamp: new Date().toISOString(),
// //           details: "Paid for ration allocation #RAT1",
// //           txHash: "0x123...",
// //           amount: "0.01 ETH"
// //         }
// //       ];
      
// //       setTxHistory(mockTxHistory);
      
// //     } catch (error) {
// //       console.error("Error fetching user data:", error);
// //       setError("Failed to fetch user data: " + error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle clicking "Pay Now" from notification
// //   const handlePayNow = (notification) => {
// //     // Prepare payment data
// //     const paymentData = {
// //       id: notification.rationId || notification.id,
// //       depotId: notification.depotId,
// //       date: notification.date,
// //       amount: notification.amount,
// //       items: notification.items,
// //       isPaid: false
// //     };
    
// //     // Close the notification
// //     setNewAllocationNotice(null);
    
// //     // Set up payment dialog with data
// //     setSelectedRation(paymentData);
// //     setPaymentAmount(notification.amount);
// //     setPaymentDialog(true);
// //   };

// //   // Pay for allocated ration
// //   const payForRation = async (rationId, amount) => {
// //     try {
// //       setPaying(true);
// //       setPaymentDialog(false);
      
// //       // Show processing message
// //       setSuccess("Processing your payment...");
      
// //       const signer = await provider.getSigner();
// //       const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      
// //       // Convert ETH amount to wei
// //       const paymentAmountWei = ethers.parseEther(amount);
      
// //       // Call the smart contract to make payment
// //       // This is a simplified example - you would typically call a function like allocateRation
// //       // In this case, we're assuming the ration is already allocated and we're just paying for it
// //       const tx = await contract.allocateRation(
// //         userId,
// //         selectedRation.depotId,
// //         0, // No delivery person involved in direct payment
// //         { value: paymentAmountWei }
// //       );
      
// //       setSuccess("Payment transaction submitted! Waiting for confirmation...");
      
// //       // Wait for transaction to be mined
// //       const receipt = await tx.wait();
      
// //       // Update transaction history
// //       const newTx = {
// //         type: "Payment",
// //         timestamp: new Date().toISOString(),
// //         details: `Paid for ration allocation #${rationId}`,
// //         txHash: receipt.hash,
// //         amount: `${amount} ETH`
// //       };
      
// //       setTxHistory([newTx, ...txHistory]);
      
// //       // Update ration status in local state
// //       const updatedRations = userRations.map(ration => {
// //         if (ration.id === rationId) {
// //           return { ...ration, isPaid: true };
// //         }
// //         return ration;
// //       });
      
// //       setUserRations(updatedRations);
// //       setSuccess(`Payment of ${amount} ETH for ration #${rationId} completed successfully!`);
      
// //     } catch (error) {
// //       console.error("Error making payment:", error);
// //       setError("Payment failed: " + error.message);
// //     } finally {
// //       setPaying(false);
// //     }
// //   };

// //   // Format date for display
// //   const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     const date = new Date(dateString);
// //     return new Intl.DateTimeFormat('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     }).format(date);
// //   };

// //   // Mock chart data based on user's category
// //   const getChartData = () => {
// //     if (!userData) return [];
    
// //     // Different allocation patterns based on user category
// //     switch (userData.category) {
// //       case 1: // BPL
// //         return [
// //           { name: "Jan", rice: 5, wheat: 3, sugar: 1, oil: 1 },
// //           { name: "Feb", rice: 5, wheat: 3, sugar: 1, oil: 1 },
// //           { name: "Mar", rice: 6, wheat: 4, sugar: 2, oil: 1 },
// //           { name: "Apr", rice: 5, wheat: 3, sugar: 1, oil: 1 },
// //           { name: "May", rice: 7, wheat: 4, sugar: 2, oil: 2 },
// //         ];
// //       case 2: // APL
// //         return [
// //           { name: "Jan", rice: 3, wheat: 2, sugar: 0.5, oil: 0.5 },
// //           { name: "Feb", rice: 3, wheat: 2, sugar: 0.5, oil: 0.5 },
// //           { name: "Mar", rice: 4, wheat: 3, sugar: 1, oil: 0.5 },
// //           { name: "Apr", rice: 3, wheat: 2, sugar: 0.5, oil: 0.5 },
// //           { name: "May", rice: 5, wheat: 3, sugar: 1, oil: 1 },
// //         ];
// //       default:
// //         return [
// //           { name: "Jan", rice: 4, wheat: 2, sugar: 1, oil: 0.5 },
// //           { name: "Feb", rice: 4, wheat: 2, sugar: 1, oil: 0.5 },
// //           { name: "Mar", rice: 5, wheat: 3, sugar: 1, oil: 1 },
// //           { name: "Apr", rice: 4, wheat: 2, sugar: 1, oil: 0.5 },
// //           { name: "May", rice: 6, wheat: 3, sugar: 2, oil: 1 },
// //         ];
// //     }
// //   };

// //   // Get stats for dashboard
// //   const getStats = () => [
// //     {
// //       title: "Category",
// //       value: userData?.category === 1 ? "BPL" : userData?.category === 2 ? "APL" : "General",
// //       change: "Active",
// //       icon: Users,
// //       color: "bg-emerald-100 text-emerald-600",
// //     },
// //     {
// //       title: "Rations Received",
// //       value: userRations.filter(r => r.isPaid).length.toString(),
// //       change: `+${userRations.filter(r => r.isPaid).length > 0 ? 1 : 0}`,
// //       icon: Package,
// //       color: "bg-blue-100 text-blue-600",
// //     },
// //     {
// //       title: "Pending Payments",
// //       value: userRations.filter(r => !r.isPaid).length.toString(),
// //       change: userRations.filter(r => !r.isPaid).length > 0 ? "Action Required" : "All Clear",
// //       icon: IndianRupee,
// //       color: "bg-amber-100 text-amber-600",
// //     },
// //     {
// //       title: "Depot",
// //       value: userData?.depotId ? `#${userData.depotId}` : "None",
// //       change: userData?.depotId ? "Assigned" : "Unassigned",
// //       icon: HeartHandshake,
// //       color: "bg-purple-100 text-purple-600",
// //     },
// //   ];

// //   // Payment Notification Component
// //   const PaymentNotification = ({ notification, onClose, onPay }) => {
// //     return (
// //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //         <div className="bg-white rounded-lg p-6 max-w-md w-full">
// //           <div className="flex items-center mb-4">
// //             <div className="w-12 h-12 mr-4 bg-green-100 rounded-full flex items-center justify-center">
// //               <Package className="h-6 w-6 text-green-600" />
// //             </div>
// //             <h3 className="text-lg font-bold">New Ration Allocated!</h3>
// //           </div>
          
// //           <div className="border-t border-b py-4 my-4">
// //             <div className="flex justify-between mb-2">
// //               <span className="text-gray-600">Depot:</span>
// //               <span className="font-medium">#{notification.depotId}</span>
// //             </div>
            
// //             <div className="flex justify-between mb-2">
// //               <span className="text-gray-600">Amount Due:</span>
// //               <span className="font-medium text-green-600">{notification.amount} ETH</span>
// //             </div>
            
// //             <div className="mt-3">
// //               <p className="font-medium text-gray-700">Items included:</p>
// //               <div className="flex flex-wrap gap-1 mt-1">
// //                 {notification.items.map((item, index) => (
// //                   <Badge key={index} className="bg-green-50 text-green-800 border-green-200">
// //                     {item.name}: {item.quantity}
// //                   </Badge>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="flex justify-between gap-4 mt-4">
// //             <Button 
// //               variant="outline" 
// //               className="flex-1"
// //               onClick={onClose}
// //             >
// //               Pay Later
// //             </Button>
// //             <Button 
// //               className="flex-1 bg-green-600 hover:bg-green-700"
// //               onClick={onPay}
// //             >
// //               <IndianRupee className="h-4 w-4 mr-2" />
// //               Pay Now
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };
  

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <div className="text-center">
// //           <Loader2 className="h-12 w-12 mx-auto animate-spin text-emerald-600" />
// //           <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error && !isConnected) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <div className="text-center max-w-md">
// //           <AlertCircle className="h-12 w-12 mx-auto text-red-600" />
// //           <h2 className="mt-4 text-xl font-bold text-gray-800">Authentication Error</h2>
// //           <p className="mt-2 text-gray-600">{error}</p>
// //           <Button 
// //             className="mt-6 bg-emerald-600 hover:bg-emerald-700" 
// //             onClick={() => router.push('/')}
// //           >
// //             Back to Home
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6 max-w-7xl mx-auto p-6">
// //       {/* Header */}
// //       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
// //           {userData && (
// //             <p className="text-gray-500">Welcome back, {userData.name}</p>
// //           )}
// //         </div>
// //         <div className="mt-4 md:mt-0">
// //           <p className="text-sm text-gray-500">
// //             Connected as: <span className="font-mono">{userAddress?.substring(0, 6)}...{userAddress?.substring(userAddress.length - 4)}</span>
// //           </p>
// //         </div>
// //       </div>

// //       {error && (
// //         <Alert variant="destructive">
// //           <AlertCircle className="h-4 w-4" />
// //           <AlertTitle>Error</AlertTitle>
// //           <AlertDescription>{error}</AlertDescription>
// //         </Alert>
// //       )}

// //       {success && (
// //         <Alert className="bg-green-50 border-green-200">
// //           <CheckCircle2 className="h-4 w-4 text-green-600" />
// //           <AlertTitle className="text-green-800">Success</AlertTitle>
// //           <AlertDescription className="text-green-700">{success}</AlertDescription>
// //         </Alert>
// //       )}

// //       {/* Tabs */}
// //       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
// //         <TabsList className="bg-green-50 mb-6">
// //           <TabsTrigger value="overview" className="data-[state=active]:bg-white">
// //             Overview
// //           </TabsTrigger>
// //           <TabsTrigger value="rations" className="data-[state=active]:bg-white">
// //             My Rations
// //           </TabsTrigger>
// //           <TabsTrigger value="history" className="data-[state=active]:bg-white">
// //             Transaction History
// //           </TabsTrigger>
// //         </TabsList>

// //         {/* Overview Tab */}
// //         <TabsContent value="overview" className="space-y-6">
// //           {/* Stats */}
// //           <motion.div
// //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
// //             variants={container}
// //             initial="hidden"
// //             animate="show"
// //           >
// //             {getStats().map((stat, index) => (
// //               <motion.div key={index} variants={item}>
// //                 <Card>
// //                   <CardContent className="p-6">
// //                     <div className="flex items-center justify-between">
// //                       <div>
// //                         <p className="text-sm font-medium text-gray-500">{stat.title}</p>
// //                         <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
// //                         <div className="flex items-center mt-1 text-sm">
// //                           <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
// //                           <span className="text-emerald-500">{stat.change}</span>
// //                         </div>
// //                       </div>
// //                       <div className={`${stat.color} p-3 rounded-full`}>
// //                         <stat.icon className="h-6 w-6" />
// //                       </div>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </motion.div>
// //             ))}
// //           </motion.div>

// //           {/* Allocation Chart */}
// //           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Ration Allocation History</CardTitle>
// //                 <CardDescription>
// //                   Monthly allocation based on your category: {userData?.category === 1 ? "BPL" : userData?.category === 2 ? "APL" : "General"}
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="h-80">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
// //                       <CartesianGrid strokeDasharray="3 3" />
// //                       <XAxis dataKey="name" />
// //                       <YAxis />
// //                       <Tooltip
// //                         contentStyle={{
// //                           backgroundColor: "white",
// //                           border: "1px solid #e2e8f0",
// //                           borderRadius: "0.5rem",
// //                         }}
// //                       />
// //                       <Bar dataKey="rice" name="Rice (kg)" fill="#10B981" radius={[4, 4, 0, 0]} />
// //                       <Bar dataKey="wheat" name="Wheat (kg)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
// //                       <Bar dataKey="sugar" name="Sugar (kg)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
// //                       <Bar dataKey="oil" name="Oil (L)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
// //                     </BarChart>
// //                   </ResponsiveContainer>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>

// //           {/* Recent Activity Grid */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* Pending Payments */}
// //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Pending Payments</CardTitle>
// //                   <CardDescription>Rations allocated but not yet paid</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="space-y-4">
// //                     {userRations.filter(r => !r.isPaid).length > 0 ? (
// //                       userRations.filter(r => !r.isPaid).map((ration) => (
// //                         <div key={ration.id} className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
// //                           <div className="w-2 h-2 mt-2 rounded-full bg-amber-500"></div>
// //                           <div className="flex-1">
// //                             <div className="flex justify-between">
// //                               <h4 className="text-sm font-medium">Ration #{ration.id}</h4>
// //                               <Badge className="bg-amber-100 text-amber-800">Pending Payment</Badge>
// //                             </div>
// //                             <p className="text-sm text-gray-500 mt-1">
// //                               Allocated on {formatDate(ration.date)}
// //                             </p>
// //                             <p className="text-xs text-gray-400 mt-1">
// //                               From Depot #{ration.depotId}
// //                             </p>
// //                             <Button
// //                               className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-sm h-8"
// //                               onClick={() => {
// //                                 setSelectedRation(ration);
// //                                 setPaymentAmount(ration.amount || "0.01");
// //                                 setPaymentDialog(true);
// //                               }}
// //                             >
// //                               <IndianRupee className="h-3.5 w-3.5 mr-1" />
// //                               Pay {ration.amount || "0.01"} ETH
// //                             </Button>
// //                           </div>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       <div className="text-center py-8 bg-green-50/50 rounded-md">
// //                         <CheckCircle2 className="mx-auto h-12 w-12 text-gray-400" />
// //                         <p className="mt-2 text-gray-600">No pending payments</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </motion.div>

// //             {/* Recent Transactions */}
// //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Recent Transactions</CardTitle>
// //                   <CardDescription>Latest blockchain transactions</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="space-y-4">
// //                     {txHistory.length > 0 ? (
// //                       txHistory.slice(0, 3).map((tx, i) => (
// //                         <div key={i} className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
// //                           <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
// //                           <div className="flex-1">
// //                             <div className="flex justify-between">
// //                               <h4 className="text-sm font-medium">{tx.type}</h4>
// //                               <span className="text-sm font-mono text-emerald-600">{tx.amount}</span>
// //                             </div>
// //                             <p className="text-sm text-gray-500 mt-1">
// //                               {tx.details}
// //                             </p>
// //                             <p className="text-xs text-gray-400 mt-1">
// //                               {formatDate(tx.timestamp)}
// //                             </p>
// //                             <a 
// //                               href={`https://sepolia.etherscan.io/tx/${tx.txHash}`} 
// //                               target="_blank" 
// //                               rel="noopener noreferrer"
// //                               className="text-xs text-blue-600 hover:underline flex items-center mt-1"
// //                             >
// //                               View on Etherscan
// //                               <ArrowUpRight className="ml-1 h-3 w-3" />
// //                             </a>
// //                           </div>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       <div className="text-center py-8 bg-green-50/50 rounded-md">
// //                         <History className="mx-auto h-12 w-12 text-gray-400" />
// //                         <p className="mt-2 text-gray-600">No transaction history yet</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </CardContent>
// //                 {txHistory.length > 3 && (
// //                   <CardFooter>
// //                     <Button 
// //                       variant="outline" 
// //                       className="w-full border-emerald-200 text-emerald-700"
// //                       onClick={() => setActiveTab('history')}
// //                     >
// //                       View All Transactions
// //                     </Button>
// //                   </CardFooter>
// //                 )}
// //               </Card>
// //             </motion.div>
// //           </div>
// //         </TabsContent>

// //         {/* My Rations Tab */}
// //         <TabsContent value="rations" className="space-y-6">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>My Ration Allocations</CardTitle>
// //               <CardDescription>View all allocated rations and make payments</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               {userRations.length > 0 ? (
// //                 <Table>
// //                   <TableHeader>
// //                     <TableRow className="bg-green-50 hover:bg-green-100">
// //                       <TableHead>ID</TableHead>
// //                       <TableHead>Date</TableHead>
// //                       <TableHead>Depot</TableHead>
// //                       <TableHead>Items</TableHead>
// //                       <TableHead>Status</TableHead>
// //                       <TableHead>Action</TableHead>
// //                     </TableRow>
// //                   </TableHeader>
// //                   <TableBody>
// //                     {userRations.map((ration) => (
// //                       <TableRow key={ration.id} className="hover:bg-green-50/50">
// //                         <TableCell className="font-medium">{ration.id}</TableCell>
// //                         <TableCell>{formatDate(ration.date)}</TableCell>
// //                         <TableCell>#{ration.depotId}</TableCell>
// //                         <TableCell>
// //                           <div className="flex flex-wrap gap-1">
// //                             {ration.items.map((item, index) => (
// //                               <Badge key={index} variant="outline" className="bg-green-50 text-green-800 border-green-200">
// //                                 {item.name}: {item.quantity}
// //                               </Badge>
// //                             ))}
// //                           </div>
// //                         </TableCell>
// //                         <TableCell>
// //                           {ration.isPaid ? (
// //                             <Badge className="bg-green-100 text-green-800">Paid</Badge>
// //                           ) : (
// //                             <Badge className="bg-amber-100 text-amber-800">Payment Pending</Badge>
// //                           )}
// //                         </TableCell>
// //                         <TableCell>
// //                           {!ration.isPaid && (
// //                             <Button
// //                               variant="outline"
// //                               size="sm"
// //                               className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
// //                               onClick={() => {
// //                                 setSelectedRation(ration);
// //                                 setPaymentAmount(ration.amount || "0.01");
// //                                 setPaymentDialog(true);
// //                               }}
// //                             >
// //                               <IndianRupee className="h-3.5 w-3.5 mr-1" />
// //                               Pay Now
// //                             </Button>
// //                           )}
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               ) : (
// //                 <div className="text-center py-12 bg-green-50/50 rounded-md">
// //                   <Package className="mx-auto h-12 w-12 text-gray-400" />
// //                   <p className="mt-2 text-gray-600">No rations allocated yet</p>
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Upcoming Allocations</CardTitle>
// //               <CardDescription>Schedule for upcoming ration distributions</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <div className="flex items-start space-x-4 pb-4 border-b">
// //                   <div className="min-w-[60px] text-center">
// //                     <p className="text-sm font-bold text-emerald-600">May 15</p>
// //                     <p className="text-xs text-gray-500">Mon</p>
// //                   </div>
// //                   <div>
// //                     <h4 className="text-sm font-medium">Regular Monthly Package</h4>
// //                     <p className="text-sm text-gray-500 mt-1">
// //                       Rice, wheat, oil, and pulses
// //                     </p>
// //                     <p className="text-xs text-emerald-600 mt-1">
// //                       At Depot #{userData?.depotId || "N/A"}
// //                     </p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-start space-x-4 pb-4">
// //                   <div className="min-w-[60px] text-center">
// //                     <p className="text-sm font-bold text-emerald-600">Jun 01</p>
// //                     <p className="text-xs text-gray-500">Thu</p>
// //                   </div>
// //                   <div>
// //                     <h4 className="text-sm font-medium">Quarterly Distribution</h4>
// //                     <p className="text-sm text-gray-500 mt-1">
// //                       Extended package with additional items
// //                     </p>
// //                     <p className="text-xs text-emerald-600 mt-1">
// //                       At Depot #{userData?.depotId || "N/A"}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </TabsContent>

// //         {/* Transaction History Tab */}
// //         <TabsContent value="history" className="space-y-6">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Transaction History</CardTitle>
// //               <CardDescription>Complete record of your blockchain transactions</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               {txHistory.length > 0 ? (
// //                 <Table>
// //                   <TableHeader>
// //                     <TableRow className="bg-green-50 hover:bg-green-100">
// //                       <TableHead>Type</TableHead>
// //                       <TableHead>Date</TableHead>
// //                       <TableHead>Details</TableHead>
// //                       <TableHead>Amount</TableHead>
// //                       <TableHead>Transaction</TableHead>
// //                     </TableRow>
// //                   </TableHeader>
// //                   <TableBody>
// //                     {txHistory.map((tx, index) => (
// //                       <TableRow key={index} className="hover:bg-green-50/50">
// //                         <TableCell className="font-medium">{tx.type}</TableCell>
// //                         <TableCell>{formatDate(tx.timestamp)}</TableCell>
// //                         <TableCell>{tx.details}</TableCell>
// //                         <TableCell>
// //                           <span className="font-mono text-emerald-600">{tx.amount}</span>
// //                         </TableCell>
// //                         <TableCell>
// //                           {tx.txHash && (
// //                             <a 
// //                               href={`https://sepolia.etherscan.io/tx/${tx.txHash}`} 
// //                               target="_blank" 
// //                               rel="noopener noreferrer"
// //                               className="text-green-600 hover:underline flex items-center"
// //                             >
// //                               View on Etherscan
// //                               <ArrowUpRight className="ml-1 h-3 w-3" />
// //                             </a>
// //                           )}
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               ) : (
// //                 <div className="text-center py-12 bg-green-50/50 rounded-md">
// //                   <Receipt className="mx-auto h-12 w-12 text-gray-400" />
// //                   <p className="mt-2 text-gray-600">No transaction history yet</p>
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </TabsContent>
// //       </Tabs>

// //       {/* Payment Dialog */}
// //       <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
// //         <DialogContent className="sm:max-w-[425px]">
// //           <DialogHeader>
// //             <DialogTitle>Make Payment</DialogTitle>
// //             <DialogDescription>
// //               Complete payment for your allocated ration
// //             </DialogDescription>
// //           </DialogHeader>
          
// //           {selectedRation && (
// //             <div className="space-y-4 py-4">
// //               <div className="bg-gray-50 p-4 rounded-md">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-500">Ration ID:</span>
// //                   <span className="font-medium">{selectedRation.id}</span>
// //                 </div>
// //                 <div className="flex justify-between text-sm mt-2">
// //                   <span className="text-gray-500">Depot:</span>
// //                   <span className="font-medium">#{selectedRation.depotId}</span>
// //                 </div>
// //                 <div className="flex justify-between text-sm mt-2">
// //                   <span className="text-gray-500">Date:</span>
// //                   <span className="font-medium">{formatDate(selectedRation.date)}</span>
// //                 </div>
// //                 <div className="flex justify-between text-sm mt-2">
// //                   <span className="text-gray-500">Amount:</span>
// //                   <span className="font-mono font-bold text-emerald-600">{paymentAmount} ETH</span>
// //                 </div>
// //               </div>
              
// //               <div className="space-y-1">
// //                 <p className="text-sm text-gray-700">Items included:</p>
// //                 <div className="flex flex-wrap gap-2">
// //                   {selectedRation.items.map((item, index) => (
// //                     <Badge key={index} className="bg-emerald-50 text-emerald-800 border-emerald-200">
// //                       {item.name}: {item.quantity}
// //                     </Badge>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           )}
          
// //           <DialogFooter>
// //             <Button
// //               type="button"
// //               variant="outline"
// //               onClick={() => setPaymentDialog(false)}
// //             >
// //               Cancel
// //             </Button>
// //             <Button
// //               type="button"
// //               className="bg-emerald-600 hover:bg-emerald-700"
// //               onClick={() => payForRation(selectedRation.id, paymentAmount)}
// //               disabled={paying}
// //             >
// //               {paying ? (
// //                 <>
// //                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// //                   Processing...
// //                 </>
// //               ) : (
// //                 <>
// //                   <IndianRupee className="h-4 w-4 mr-2" />
// //                   Pay {paymentAmount} ETH
// //                 </>
// //               )}
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Payment Notification Popup */}
// //       {newAllocationNotice && (
// //         <PaymentNotification 
// //           notification={newAllocationNotice}
// //           onClose={() => setNewAllocationNotice(null)}
// //           onPay={() => handlePayNow(newAllocationNotice)}
// //         />
// //       )}
// //     </div>
// //   )
// // }


// 'use client'

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { ethers } from "ethers"
// import { 
//   Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter
// } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form"
// import { motion } from "framer-motion"
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
// import { 
//   ArrowUpRight, Users, Package, CheckCircle, RefreshCcw, MessageSquare, 
//   Loader2, CheckCircle2, Clock, AlertCircle, IndianRupee, Bell
// } from "lucide-react"
// import contractABI from "@/lib/abi.json"

// const CONTRACT_ADDRESS = "0x1c61F82aad05c30190C211c1E28f2dE28f1f8Ab8" // Replace with actual contract address

// // Animation variants for Framer Motion
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 15,
//     },
//   },
// };

// export default function DepotDashboard() {
//   const [provider, setProvider] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const router = useRouter();
  
//   // Depot details
//   const [depotId, setDepotId] = useState('');
//   const [depotName, setDepotName] = useState('');
//   const [depotLocation, setDepotLocation] = useState('');
  
//   // Users and deliveries
//   const [assignedUsers, setAssignedUsers] = useState([]);
//   const [assignedDeliveryPersons, setAssignedDeliveryPersons] = useState([]);
//   const [pendingDeliveries, setPendingDeliveries] = useState([]);
//   const [activeDelivery, setActiveDelivery] = useState(null);
//   const [completedDeliveries, setCompletedDeliveries] = useState([]);
//   const [rationDistributions, setRationDistributions] = useState([]);
  
//   // MetaMask modal simulation
//   const [showMetaMaskModal, setShowMetaMaskModal] = useState(false);
//   const [metaMaskModalType, setMetaMaskModalType] = useState('');
//   const [metaMaskModalMessage, setMetaMaskModalMessage] = useState('');
//   const [fakeTransactionHash, setFakeTransactionHash] = useState('');
//   const [fakeMode, setFakeMode] = useState(true);  
  
//   // OTP verification
//   const [otpInput, setOtpInput] = useState('');
  
//   // Form state
//   const [showDistributionForm, setShowDistributionForm] = useState(false);
//   const [showOTPModal, setShowOTPModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);

//   // Notification state - NEW
//   const [notificationSent, setNotificationSent] = useState(false);
  
//   // Initialize provider and check if depot is authenticated
//   useEffect(() => {
//     const initProvider = async () => {
//       try {
//         // Check if window is defined (browser environment)
//         if (typeof window !== "undefined" && window.ethereum) {
//           const ethProvider = window.ethereum;
          
//           // Request account access
//           const accounts = await ethProvider.request({ method: "eth_requestAccounts" });
//           const address = accounts[0];
          
//           // Create ethers provider
//           const provider = new ethers.BrowserProvider(ethProvider);
//           setProvider(provider);
          
//           const signer = await provider.getSigner();
//           const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
          
//           try {
//             // Check if depot exists
//             const depotId = await contract.getDepotIdByAddress(address);
            
//             if (depotId && Number(depotId) > 0) {
//               setDepotId(Number(depotId));
//               setIsConnected(true);
//               fetchDepotData(contract, Number(depotId));
//             } else {
//               setError("You are not registered as a depot. Please register first.");
//               router.push('/');
//             }
//           } catch (error) {
//             console.error("Error checking depot:", error);
//             setError("You are not registered as a depot. Please register first.");
//             router.push('/');
//           }
//         } else {
//           setError("Please install MetaMask to use this application");
//         }
//       } catch (error) {
//         console.error("Error initializing provider:", error);
//         setError("Failed to connect wallet. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     initProvider();
//   }, [router]);
  
//   // Function to get contract instance
//   const getContract = (signer) => {
//     return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
//   };
  
//   // Save transaction to history
//   const saveTransaction = (tx) => {
//     const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
//     transactions.push(tx);
//     localStorage.setItem('transactions', JSON.stringify(transactions));
//   };
  
//   // Fetch depot data from blockchain
//   const fetchDepotData = async (contract, depotId) => {
//     try {
//       setLoading(true);
      
//       // Get depot details
//       const depotDetails = await contract.getDepotDetails(depotId);
      
//       setDepotName(depotDetails.name);
//       setDepotLocation(depotDetails.location);
      
//       // Simulate fetching users assigned to this depot
//       // In a real app, you'd get this from the contract
//       const mockUsers = [
//         { id: '1', name: 'Alice Johnson', category: 'BPL', lastRationDate: new Date(Date.now() - 30*24*60*60*1000).toISOString() },
//         { id: '2', name: 'Bob Smith', category: 'APL', lastRationDate: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
//         { id: '3', name: 'Charlie Davis', category: 'BPL', lastRationDate: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
//         { id: '4', name: 'Diana Wilson', category: 'APL', lastRationDate: null },
//       ];
      
//       setAssignedUsers(mockUsers);
      
//       // Simulate fetching delivery persons assigned to this depot
//       const mockDeliveryPersons = [
//         { id: '1', name: 'John Delivery', activeDeliveries: 2, completedDeliveries: 15 },
//         { id: '2', name: 'Mary Carrier', activeDeliveries: 1, completedDeliveries: 23 },
//       ];
      
//       setAssignedDeliveryPersons(mockDeliveryPersons);
      
//       // Simulate fetching pending deliveries
//       const mockPendingDeliveries = [
//         { id: 'DEL1', userId: '1', userName: 'Alice Johnson', deliveryPersonId: '1', deliveryPersonName: 'John Delivery', status: 'pending', date: new Date(Date.now() - 2*24*60*60*1000).toISOString() },
//         { id: 'DEL2', userId: '2', userName: 'Bob Smith', deliveryPersonId: '2', deliveryPersonName: 'Mary Carrier', status: 'in-transit', date: new Date(Date.now() - 1*24*60*60*1000).toISOString() },
//       ];
      
//       setPendingDeliveries(mockPendingDeliveries);
      
//       // Simulate fetching completed deliveries
//       const mockCompletedDeliveries = [
//         { id: 'DEL3', userId: '3', userName: 'Charlie Davis', deliveryPersonId: '1', deliveryPersonName: 'John Delivery', status: 'completed', date: new Date(Date.now() - 5*24*60*60*1000).toISOString() },
//       ];
      
//       setCompletedDeliveries(mockCompletedDeliveries);
      
//       // Simulate fetching ration distributions
//       const mockRationDistributions = [
//         { id: 'RAT1', userId: '1', userName: 'Alice Johnson', category: 'BPL', deliveryPersonId: '1', deliveryPersonName: 'John Delivery', date: new Date(Date.now() - 30*24*60*60*1000).toISOString(), ethAmount: '0.01', items: [{ name: 'Rice', quantity: '5kg' }, { name: 'Wheat', quantity: '3kg' }] },
//         { id: 'RAT2', userId: '3', userName: 'Charlie Davis', category: 'BPL', deliveryPersonId: '2', deliveryPersonName: 'Mary Carrier', date: new Date(Date.now() - 45*24*60*60*1000).toISOString(), items: [{ name: 'Rice', quantity: '5kg' }, { name: 'Oil', quantity: '1L' }] },
//       ];
      
//       setRationDistributions(mockRationDistributions);
      
//     } catch (error) {
//       console.error("Error fetching depot data:", error);
//       setError("Failed to load depot data: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     }).format(date);
//   };
//   // Fixed payForRation function - using the contract's payment function


//   // NEW: Function to notify users about ration allocation
//   const notifyUserAboutRation = (userId, rationId, amount, items = []) => {
//     // Get existing notifications from localStorage
//     const notifications = JSON.parse(localStorage.getItem('rationchain-payment-notifications') || '[]');
    
//     // Create a new notification
//     const notification = {
//       id: `${Date.now()}`,
//       userId: userId,
//       rationId: rationId,
//       depotId: depotId,
//       depotName: depotName || `Depot #${depotId}`,
//       amount: amount || "0.01",
//       date: new Date().toISOString(),
//       items: items || [
//         { name: 'Rice', quantity: '5kg' },
//         { name: 'Wheat', quantity: '3kg' },
//         { name: 'Sugar', quantity: '1kg' },
//         { name: 'Oil', quantity: '1L' }
//       ],
//       read: false
//     };
    
//     // Add to notifications array
//     notifications.push(notification);
    
//     // Save back to localStorage
//     localStorage.setItem('rationchain-payment-notifications', JSON.stringify(notifications));
    
//     // Show notification sent indicator
//     setNotificationSent(true);
//     setTimeout(() => setNotificationSent(false), 3000);
    
//     console.log(`Notification sent to user ${userId} for ration ${rationId}`);
//   };
  
//   // Handle recording ration distribution
//   const trackRationDistribution = async (userId, deliveryPersonId = '0', ethAmount = '0', items) => {
//     try {
//       setLoading(true);
      
//       // Show MetaMask popup
//       setMetaMaskModalType("allocation");
//       setMetaMaskModalMessage("Processing ration allocation on blockchain...");
//       setShowMetaMaskModal(true);
      
//       try {
//         const ethersProvider = new ethers.BrowserProvider(provider);
//         const signer = await ethersProvider.getSigner();
//         const contract = getContract(signer);
        
//         // Convert ETH amount to wei
//         const amountInWei = ethers.parseEther(ethAmount || "0").toString();
        
//         console.log("Allocating ration with parameters:", {
//           userId: userId,
//           deliveryPersonId: deliveryPersonId || '0',
//           amount: amountInWei
//         });
        
//         // Call contract to allocate ration
//         const trackTx = await contract.allocateRation(
//           userId,
//           deliveryPersonId || '0',
//           amountInWei
//         );
        
//         console.log("Transaction sent:", trackTx.hash);
        
//         // Wait for transaction confirmation
//         const receipt = await trackTx.wait();
//         console.log("Transaction confirmed:", receipt);
        
//         // Hide MetaMask popup
//         setShowMetaMaskModal(false);
        
//         // Save transaction to history
//         saveTransaction({
//           type: 'Allocate Ration',
//           txHash: trackTx.hash,
//           timestamp: Date.now(),
//           details: `Ration allocated to User ID: ${userId}${deliveryPersonId && deliveryPersonId !== '0' ? ` via Delivery Person ID: ${deliveryPersonId}` : ''}${parseFloat(ethAmount) > 0 ? ` with amount of ${ethAmount} ETH` : ''}`
//         });
        
//         // Update ration distributions
//         const user = assignedUsers.find(u => u.id === userId);
//         const deliveryPerson = assignedDeliveryPersons.find(p => p.id === deliveryPersonId);
        
//         const newDistribution = {
//           id: `RAT${Date.now()}`,
//           userId: userId,
//           userName: user ? user.name : `User ${userId}`,
//           category: user ? user.category : 'Unknown',
//           date: new Date().toISOString(),
//           deliveryPersonId: deliveryPersonId || '0',
//           deliveryPersonName: deliveryPerson ? deliveryPerson.name : 'Direct Distribution',
//           ethAmount: parseFloat(ethAmount) > 0 ? ethAmount : null,
//           items: items || [
//             { name: 'Rice', quantity: '5kg' },
//             { name: 'Wheat', quantity: '3kg' },
//             { name: 'Sugar', quantity: '1kg' },
//             { name: 'Oil', quantity: '1L' }
//           ]
//         };
        
//         setRationDistributions([newDistribution, ...rationDistributions]);
        
//         // Update user's last ration date
//         const updatedUsers = assignedUsers.map(u => {
//           if (u.id === userId) {
//             return {...u, lastRationDate: new Date().toISOString()};
//           }
//           return u;
//         });
        
//         setAssignedUsers(updatedUsers);
        
//         // NEW: Send notification to user
//         notifyUserAboutRation(userId, newDistribution.id, ethAmount, newDistribution.items);
        
//         // Show success message
//         setSuccess(`Ration allocation to ${user ? user.name : 'User ' + userId} completed successfully!${parseFloat(ethAmount) > 0 ? ` Amount of ${ethAmount} ETH included.` : ''}`);
        
//       } catch (error) {
//         setShowMetaMaskModal(false);
//         throw error;
//       }
//     } catch (error) {
//       console.error('Error tracking ration distribution:', error);
//       setError('Failed to allocate ration: ' + (error.message || error.toString()));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form submission for distribution recording
//   const handleRecordDistribution = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const userId = formData.get("userId");
//     const deliveryPersonId = formData.get("deliveryPersonId") || "0";
//     const ethAmount = formData.get("ethAmount") || "0";
    
//     // Create items array from form data
//     const items = [
//       { name: "Rice", quantity: formData.get("riceQty") || "0kg" },
//       { name: "Wheat", quantity: formData.get("wheatQty") || "0kg" },
//       { name: "Sugar", quantity: formData.get("sugarQty") || "0kg" },
//       { name: "Oil", quantity: formData.get("oilQty") || "0kg" }
//     ];

//     try {
//       await trackRationDistribution(userId, deliveryPersonId, ethAmount, items);
//       setShowDistributionForm(false);
//     } catch (error) {
//       setError("Failed to record distribution: " + error.message);
//     }
//   };
  
//   // Show loading UI
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 mx-auto animate-spin text-emerald-600" />
//           <p className="mt-4 text-lg text-gray-600">Loading depot dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show error UI if not connected or other error
//   if (error && !isConnected) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center max-w-md">
//           <AlertCircle className="h-12 w-12 mx-auto text-red-600" />
//           <h2 className="mt-4 text-xl font-bold text-gray-800">Authentication Error</h2>
//           <p className="mt-2 text-gray-600">{error}</p>
//           <Button 
//             className="mt-6 bg-emerald-600 hover:bg-emerald-700" 
//             onClick={() => router.push('/')}
//           >
//             Back to Home
//           </Button>
//         </div>
//       </div>
//     );
//   }
//   const payForRation = async (rationId, amount) => {
//     try {
//       setPaying(true);
//       setPaymentDialog(false);
      
//       // Show processing message
//       setSuccess("Processing your payment...");
      
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      
//       // Convert ETH amount to wei
//       const paymentAmountWei = ethers.parseEther(amount);
      
//       // Call the proper payable function instead of direct transfer
//       const tx = await contract.pay(
//         // Pass ration ID so contract knows what payment is for
//         rationId, 
//         { 
//           value: paymentAmountWei  // Send ETH with the function call
//         }
//       );
      
//       setSuccess("Payment transaction submitted! Waiting for confirmation...");
      
//       // Wait for transaction to be mined
//       const receipt = await tx.wait();
      
//       // Rest of your function remains the same...
//       const newTx = {
//         type: "Payment",
//         timestamp: new Date().toISOString(),
//         details: `Paid for ration allocation #${rationId}`,
//         txHash: receipt.hash,
//         amount: `${amount} ETH`
//       };
      
//       setTxHistory([newTx, ...txHistory]);
      
//       // Update ration status in local state
//       const updatedRations = userRations.map(ration => {
//         if (ration.id === rationId) {
//           return { ...ration, isPaid: true };
//         }
//         return ration;
//       });
      
//       setUserRations(updatedRations);
//       setSuccess(`Payment of ${amount} ETH for ration #${rationId} completed successfully!`);
      
//     } catch (error) {
//       console.error("Error making payment:", error);
//       setError("Payment failed: " + error.message);
//     } finally {
//       setPaying(false);
//     }
//   };

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Depot Dashboard</h1>
//           <p className="text-gray-500">
//             Welcome, Depot #{depotId} - {depotName || 'Unnamed Depot'}
//           </p>
//         </div>
//         <Button 
//           onClick={() => setShowDistributionForm(true)}
//           className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700"
//         >
//           Record Distribution
//         </Button>
//       </div>

//       {/* Show error alert if any */}
//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {/* Show success message if any */}
//       {success && (
//         <Alert className="bg-green-50 border-green-200">
//           <CheckCircle2 className="h-4 w-4 text-green-600" />
//           <AlertTitle className="text-green-800">Success</AlertTitle>
//           <AlertDescription className="text-green-700">{success}</AlertDescription>
//         </Alert>
//       )}
      
//       {/* NEW: Show notification sent message */}
//       {notificationSent && (
//         <Alert className="bg-blue-50 border-blue-200 mb-4">
//           <Bell className="h-4 w-4 text-blue-600" />
//           <AlertTitle className="text-blue-800">Notification Sent</AlertTitle>
//           <AlertDescription className="text-blue-700">
//             Payment notification has been sent to the user.
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Main Content */}
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//       >
//         {/* Stat Card: Total Users */}
//         <motion.div variants={itemVariants}>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Users Assigned</p>
//                   <h3 className="text-2xl font-bold mt-1">{assignedUsers.length}</h3>
//                   <div className="flex items-center mt-1 text-sm">
//                     <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
//                     <span className="text-green-500">Active</span>
//                   </div>
//                 </div>
//                 <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
//                   <Users className="h-6 w-6" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Stat Card: Delivery Persons */}
//         <motion.div variants={itemVariants}>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Delivery Persons</p>
//                   <h3 className="text-2xl font-bold mt-1">{assignedDeliveryPersons.length}</h3>
//                   <div className="flex items-center mt-1 text-sm">
//                     <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
//                     <span className="text-green-500">Assigned</span>
//                   </div>
//                 </div>
//                 <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
//                   <MessageSquare className="h-6 w-6" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Stat Card: Pending Deliveries */}
//         <motion.div variants={itemVariants}>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Pending Deliveries</p>
//                   <h3 className="text-2xl font-bold mt-1">{pendingDeliveries.length}</h3>
//                   <div className="flex items-center mt-1 text-sm">
//                     <Clock className="h-4 w-4 text-amber-500 mr-1" />
//                     <span className="text-amber-500">In Progress</span>
//                   </div>
//                 </div>
//                 <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
//                   <Package className="h-6 w-6" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Stat Card: Distributions Made */}
//         <motion.div variants={itemVariants}>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Distributions</p>
//                   <h3 className="text-2xl font-bold mt-1">{rationDistributions.length}</h3>
//                   <div className="flex items-center mt-1 text-sm">
//                     <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
//                     <span className="text-green-500">Completed</span>
//                   </div>
//                 </div>
//                 <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
//                   <RefreshCcw className="h-6 w-6" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </motion.div>

//       {/* Tabs for users, deliveries, distributions */}
//       <Tabs defaultValue="users" className="mt-8">
//         <TabsList className="bg-green-50 mb-6">
//           <TabsTrigger value="users" className="data-[state=active]:bg-white">
//             Assigned Users
//           </TabsTrigger>
//           <TabsTrigger value="deliveries" className="data-[state=active]:bg-white">
//             Deliveries
//           </TabsTrigger>
//           <TabsTrigger value="distributions" className="data-[state=active]:bg-white">
//             Ration Distributions
//           </TabsTrigger>
//         </TabsList>

//         {/* Users Tab */}
//         <TabsContent value="users" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Users Assigned to Depot</CardTitle>
//               <CardDescription>
//                 View and manage users assigned to your depot
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-green-50 hover:bg-green-100">
//                       <TableHead className="w-[100px]">ID</TableHead>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Category</TableHead>
//                       <TableHead>Last Ration</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {assignedUsers.map((user) => (
//                       <TableRow key={user.id} className="hover:bg-gray-50">
//                         <TableCell className="font-medium">{user.id}</TableCell>
//                         <TableCell>{user.name}</TableCell>
//                         <TableCell>
//                           <Badge className={user.category === 'BPL' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}>
//                             {user.category}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           {user.lastRationDate ? (
//                             formatDate(user.lastRationDate)
//                           ) : (
//                             <span className="text-gray-500">No records</span>
//                           )}
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Button 
//                             size="sm"
//                             variant="outline"
//                             className="ml-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
//                             onClick={() => {
//                               setSelectedUser(user);
//                               setShowDistributionForm(true);
//                             }}
//                           >
//                             <Package className="mr-2 h-4 w-4" />
//                             Distribute
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Deliveries Tab */}
//         <TabsContent value="deliveries" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Pending Deliveries</CardTitle>
//               <CardDescription>
//                 Track ongoing ration deliveries
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-green-50 hover:bg-green-100">
//                       <TableHead className="w-[100px]">ID</TableHead>
//                       <TableHead>User</TableHead>
//                       <TableHead>Delivery Person</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {pendingDeliveries.map((delivery) => (
//                       <TableRow key={delivery.id} className="hover:bg-gray-50">
//                         <TableCell className="font-medium">{delivery.id}</TableCell>
//                         <TableCell>{delivery.userName}</TableCell>
//                         <TableCell>{delivery.deliveryPersonName}</TableCell>
//                         <TableCell>{formatDate(delivery.date)}</TableCell>
//                         <TableCell>
//                           <Badge className={
//                             delivery.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
//                             delivery.status === 'in-transit' ? 'bg-blue-100 text-blue-800' : 
//                             'bg-green-100 text-green-800'
//                           }>
//                             {delivery.status}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Button 
//                             size="sm"
//                             variant="outline"
//                             className="ml-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
//                             onClick={() => {
//                               setActiveDelivery(delivery);
//                               setShowOTPModal(true);
//                             }}
//                           >
//                             Generate OTP
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Completed Deliveries</CardTitle>
//               <CardDescription>
//                 History of completed ration deliveries
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-green-50 hover:bg-green-100">
//                       <TableHead className="w-[100px]">ID</TableHead>
//                       <TableHead>User</TableHead>
//                       <TableHead>Delivery Person</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Status</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {completedDeliveries.map((delivery) => (
//                       <TableRow key={delivery.id} className="hover:bg-gray-50">
//                         <TableCell className="font-medium">{delivery.id}</TableCell>
//                         <TableCell>{delivery.userName}</TableCell>
//                         <TableCell>{delivery.deliveryPersonName}</TableCell>
//                         <TableCell>{formatDate(delivery.date)}</TableCell>
//                         <TableCell>
//                           <Badge className="bg-green-100 text-green-800">
//                             {delivery.status}
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Distributions Tab */}
//         <TabsContent value="distributions" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Ration Distributions</CardTitle>
//               <CardDescription>
//                 History of ration distributions from your depot
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-green-50 hover:bg-green-100">
//                       <TableHead className="w-[100px]">ID</TableHead>
//                       <TableHead>User</TableHead>
//                       <TableHead>Via</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Items</TableHead>
//                       <TableHead>Payment</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {rationDistributions.map((distribution) => (
//                       <TableRow key={distribution.id} className="hover:bg-gray-50">
//                         <TableCell className="font-medium">{distribution.id}</TableCell>
//                         <TableCell>
//                           {distribution.userName}
//                           <Badge className={`ml-2 ${distribution.category === 'BPL' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
//                             {distribution.category}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>{distribution.deliveryPersonName}</TableCell>
//                         <TableCell>{formatDate(distribution.date)}</TableCell>
//                         <TableCell>
//                           <div className="flex flex-wrap gap-1">
//                             {distribution.items && distribution.items.map((item, index) => (
//                               <Badge key={index} variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">
//                                 {item.name}: {item.quantity}
//                               </Badge>
//                             ))}
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           {distribution.ethAmount ? (
//                             <Badge className="bg-emerald-100 text-emerald-800">
//                               <IndianRupee className="h-3 w-3 mr-1" />
//                               {distribution.ethAmount} ETH
//                             </Badge>
//                           ) : (
//                             <Badge variant="outline">No payment</Badge>
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <p className="text-sm text-gray-500">
//                 Total distributions: {rationDistributions.length}
//               </p>
//               <Button
//                 variant="outline"
//                 onClick={() => setShowDistributionForm(true)}
//                 className="border-emerald-200 text-emerald-700"
//               >
//                 <Package className="mr-2 h-4 w-4" />
//                 Record New
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {/* Record Distribution Dialog */}
//       <Dialog open={showDistributionForm} onOpenChange={setShowDistributionForm}>
//         <DialogContent className="sm:max-w-[500px]">
//           <DialogHeader>
//             <DialogTitle>Record Ration Distribution</DialogTitle>
//             <DialogDescription>
//               Record a new ration allocation to a beneficiary
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleRecordDistribution}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="userId" className="text-right">
//                   User
//                 </Label>
//                 <div className="col-span-3">
//                   <select 
//                     id="userId"
//                     name="userId"
//                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                     defaultValue={selectedUser?.id || ""}
//                     required
//                   >
//                     <option value="">Select a user</option>
//                     {assignedUsers.map(user => (
//                       <option key={user.id} value={user.id}>
//                         #{user.id} - {user.name} ({user.category})
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="deliveryPersonId" className="text-right">
//                   Delivery Person
//                 </Label>
//                 <div className="col-span-3">
//                   <select 
//                     id="deliveryPersonId"
//                     name="deliveryPersonId"
//                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                     defaultValue={selectedDeliveryPerson?.id || ""}
//                   >
//                     <option value="">Direct Distribution (No Delivery Person)</option>
//                     {assignedDeliveryPersons.map(person => (
//                       <option key={person.id} value={person.id}>
//                         #{person.id} - {person.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="ethAmount" className="text-right">
//                   Payment (ETH)
//                 </Label>
//                 <div className="col-span-3">
//                   <Input
//                     id="ethAmount"
//                     name="ethAmount"
//                     type="number"
//                     step="0.001"
//                     placeholder="0.01"
//                     defaultValue="0.01"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">
//                   Items
//                 </Label>
//                 <div className="col-span-3 grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="riceQty" className="text-xs">Rice Quantity</Label>
//                     <Input
//                       id="riceQty"
//                       name="riceQty"
//                       placeholder="5kg"
//                       defaultValue="5kg"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="wheatQty" className="text-xs">Wheat Quantity</Label>
//                     <Input
//                       id="wheatQty"
//                       name="wheatQty"
//                       placeholder="3kg"
//                       defaultValue="3kg"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="sugarQty" className="text-xs">Sugar Quantity</Label>
//                     <Input
//                       id="sugarQty"
//                       name="sugarQty"
//                       placeholder="1kg"
//                       defaultValue="1kg"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="oilQty" className="text-xs">Oil Quantity</Label>
//                     <Input
//                       id="oilQty"
//                       name="oilQty"
//                       placeholder="1L"
//                       defaultValue="1L"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={() => setShowDistributionForm(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
//                 Record Distribution
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* OTP Modal */}
//       <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Generate OTP</DialogTitle>
//             <DialogDescription>
//               Generate an OTP for the delivery person to confirm delivery
//             </DialogDescription>
//           </DialogHeader>
//           {activeDelivery && (
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Delivery ID</Label>
//                 <div className="col-span-3 font-medium">
//                   #{activeDelivery.id}
//                 </div>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">User</Label>
//                 <div className="col-span-3">
//                   {activeDelivery.userName}
//                 </div>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Delivery Person</Label>
//                 <div className="col-span-3">
//                   {activeDelivery.deliveryPersonName}
//                 </div>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Status</Label>
//                 <div className="col-span-3">
//                   <Badge className={
//                     activeDelivery.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
//                     activeDelivery.status === 'in-transit' ? 'bg-blue-100 text-blue-800' : 
//                     'bg-green-100 text-green-800'
//                   }>
//                     {activeDelivery.status}
//                   </Badge>
//                 </div>
//               </div>
//               {otpInput && (
//                 <div className="border rounded-md p-4 bg-green-50 text-center">
//                   <p className="text-sm text-gray-600">OTP for delivery confirmation</p>
//                   <p className="text-3xl font-bold font-mono tracking-widest text-emerald-700 mt-2">
//                     {otpInput}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//           <DialogFooter>
//             <Button 
//               variant="outline"
//               onClick={() => {
//                 setOtpInput('');
//                 setShowOTPModal(false);
//               }}
//             >
//               Close
//             </Button>
//             <Button 
//               className="bg-emerald-600 hover:bg-emerald-700"
//               onClick={() => {
//                 // Generate a random 6-digit OTP
//                 const randomOTP = Math.floor(100000 + Math.random() * 900000);
//                 setOtpInput(randomOTP.toString());
//               }}
//               disabled={!!otpInput}
//             >
//               {!otpInput ? (
//                 <>Generate OTP</>
//               ) : (
//                 <>OTP Generated</>
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* MetaMask Transaction Modal */}
//       {showMetaMaskModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <div className="flex flex-col items-center">
//               <img 
//                 src="/metamask-fox.svg" 
//                 alt="MetaMask" 
//                 className="h-20 w-20 mb-4" 
//               />
//               <h3 className="text-lg font-bold mb-2">
//                 {metaMaskModalType === "allocation" ? "Allocate Ration" : 
//                  metaMaskModalType === "otp" ? "Generate OTP" : 
//                  "Blockchain Transaction"}
//               </h3>
//               <p className="text-center text-gray-600 mb-4">
//                 {metaMaskModalMessage || "Please confirm the transaction in your MetaMask wallet."}
//               </p>
//               <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                 <div className="bg-emerald-600 h-2.5 rounded-full w-3/4"></div>
//               </div>
//               <p className="text-sm text-gray-500">
//                 Please do not close this window
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ethers } from "ethers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { 
  ArrowUpRight, Users, Package, MessageSquare, HeartHandshake, 
  Loader2, CheckCircle2, Clock, AlertCircle, IndianRupee, Receipt, History
} from "lucide-react"
import contractABI from "@/lib/abi.json"

const CONTRACT_ADDRESS = "0x1c61F82aad05c30190C211c1E28f2dE28f1f8Ab8"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function UserDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userRations, setUserRations] = useState([])
  const [userDeliveries, setUserDeliveries] = useState([])
  const [activeTab, setActiveTab] = useState("overview")
  const [paymentDialog, setPaymentDialog] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("0")
  const [selectedRation, setSelectedRation] = useState(null)
  const [paying, setPaying] = useState(false)
  const [txHistory, setTxHistory] = useState([])
  
  // State for payment notifications
  const [newAllocationNotice, setNewAllocationNotice] = useState(null)
  const [checkingNotifications, setCheckingNotifications] = useState(false)

  // Auth context
  const [provider, setProvider] = useState(null)
  const [userAddress, setUserAddress] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  // Initialize provider and check if user is authenticated
  useEffect(() => {
    const initProvider = async () => {
      try {
        // Check if window is defined (browser environment)
        if (typeof window !== "undefined" && window.ethereum) {
          const ethProvider = window.ethereum;
          
          // Request account access
          const accounts = await ethProvider.request({ method: "eth_requestAccounts" });
          const address = accounts[0];
          setUserAddress(address);
          
          // Create ethers provider
          const provider = new ethers.BrowserProvider(ethProvider);
          setProvider(provider);

          const signer = await provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
          
          // Debug logs
          console.log("Connected address:", address);
          console.log("Contract address:", CONTRACT_ADDRESS);
          console.log("Current network:", await provider.getNetwork());

          try {
            // Check if user exists - IMPORTANT: using getUserIdByAddress not getDepotIdByAddress
            console.log("Checking if user exists...");
            const userId = await contract.getUserIdByAddress(address);
            console.log("Received userId:", userId, "Type:", typeof userId);
            
            if (userId && Number(userId) > 0) {
              setUserId(Number(userId));
              setIsConnected(true);
              fetchUserData(contract, Number(userId));
            } else {
              setError("You are not registered as a user. Please register first.");
              router.push('/');
            }
          } catch (error) {
            console.error("Error checking user:", error);
            setError("You are not registered as a user. Please register first.");
            router.push('/');
          }
        } else {
          setError("Please install MetaMask to use this application");
        }
      } catch (error) {
        console.error("Error initializing provider:", error);
        setError("Failed to connect wallet. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initProvider();
  }, [router]);

  // Check for new payment notifications
  useEffect(() => {
    if (!userId) return;
    
    const checkForNotifications = () => {
      setCheckingNotifications(true);
      try {
        // Get notifications from localStorage
        const notifications = JSON.parse(localStorage.getItem('rationchain-payment-notifications') || '[]');
        
        // Find unread notifications for this user
        const myNotifications = notifications.filter(n => 
          n.userId == userId && !n.read
        );
        
        // If there are notifications, show the first one
        if (myNotifications.length > 0) {
          setNewAllocationNotice(myNotifications[0]);
          
          // Mark as read
          const updatedNotifications = notifications.map(n => {
            if (n.id === myNotifications[0].id) {
              return { ...n, read: true };
            }
            return n;
          });
          
          // Save back to localStorage
          localStorage.setItem('rationchain-payment-notifications', JSON.stringify(updatedNotifications));
        }
      } catch (error) {
        console.error("Error checking notifications:", error);
      } finally {
        setCheckingNotifications(false);
      }
    };
    
    // Check immediately
    checkForNotifications();
    
    // Set up interval to check regularly
    const interval = setInterval(checkForNotifications, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  // Fetch user data from blockchain
  const fetchUserData = async (contract, userId) => {
    try {
      setLoading(true);
      
      // Get user details
      const userDetails = await contract.getUserDetails(userId);
      setUserData({
        id: userId,
        name: userDetails.name,
        category: Number(userDetails.category),
        depotId: Number(userDetails.assignedDepotId),
        walletAddress: userDetails.walletAddress,
        lastRationDate: userDetails.lastRationDate ? new Date(Number(userDetails.lastRationDate) * 1000).toISOString() : null
      });
      
      // Get user deliveries
      const deliveries = await contract.getUserDeliveries(userId);
      
      // Process deliveries
      const processedDeliveries = deliveries.map(delivery => ({
        id: String(delivery.id),
        depotId: String(delivery.depotId),
        deliveryPersonId: String(delivery.deliveryPersonId),
        status: delivery.status,
        date: new Date(Number(delivery.timestamp) * 1000).toISOString(),
        isPaid: delivery.isPaid
      }));
      
      setUserDeliveries(processedDeliveries);
      
      // Get depot address for payments
      const depotDetails = await contract.getDepotDetails(Number(userDetails.assignedDepotId));
      const depotAddress = depotDetails.walletAddress;
      
      // Get ration data
      const mockRations = [
        {
          id: `RAT${Date.now()}`,
          depotId: userDetails.assignedDepotId,
          depotName: "Local Depot",
          depotAddress: depotAddress,
          date: new Date().toISOString(),
          status: "allocated",
          isPaid: false,
          amount: "0.01",
          items: [
            { name: "Rice", quantity: "5kg" },
            { name: "Wheat", quantity: "3kg" },
            { name: "Sugar", quantity: "1kg" },
            { name: "Oil", quantity: "1L" }
          ]
        }
      ];
      
      setUserRations(mockRations);
      
      // Transaction history
      const txHistory = JSON.parse(localStorage.getItem(`txHistory-${userId}`) || '[]');
      setTxHistory(txHistory);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking "Pay Now" from notification
  const handlePayNow = (notification) => {
    // Prepare payment data
    const paymentData = {
      id: notification.rationId || notification.id,
      depotId: notification.depotId,
      depotAddress: notification.depotAddress,
      date: notification.date,
      amount: notification.amount,
      items: notification.items,
      isPaid: false
    };
    
    // Close the notification
    setNewAllocationNotice(null);
    
    // Set up payment dialog with data
    setSelectedRation(paymentData);
    setPaymentAmount(notification.amount);
    setPaymentDialog(true);
  };

// FIXED payForRation function that sends payment directly to the depot wallet
const payForRation = async (rationId, amount) => {
  try {
    setPaying(true);
    setPaymentDialog(false);
    
    // Show processing message
    setSuccess("Processing your payment...");
    
    // Get depot's wallet address - THIS IS THE KEY FIX
    // We need to send money directly to a wallet, not to the contract
    let recipientAddress;
    
    try {
      if (selectedRation.depotAddress && ethers.isAddress(selectedRation.depotAddress)) {
        recipientAddress = selectedRation.depotAddress;
      } else {
        // Fallback to fetching depot address if not already available
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
        const depotDetails = await contract.getDepotDetails(selectedRation.depotId);
        recipientAddress = depotDetails.walletAddress;
      }
      
      // If still no valid address, show error
      if (!recipientAddress || !ethers.isAddress(recipientAddress)) {
        throw new Error("Could not find a valid depot wallet address for payment");
      }
    } catch (error) {
      throw new Error("Failed to get depot wallet address: " + error.message);
    }
    
    const signer = await provider.getSigner();
    
    // Convert ETH amount to wei
    const paymentAmountWei = ethers.parseEther(amount);
    
    // Send payment directly to depot wallet address - NOT to the contract
    const tx = await signer.sendTransaction({
      to: recipientAddress,
      value: paymentAmountWei
    });
    
    setSuccess("Payment transaction submitted! Waiting for confirmation...");
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    // Update transaction history
    const newTx = {
      type: "Payment",
      timestamp: new Date().toISOString(),
      details: `Paid for ration allocation #${rationId} to depot #${selectedRation.depotId}`,
      txHash: receipt.hash,
      amount: `${amount} ETH`
    };
    
    const updatedHistory = [newTx, ...txHistory];
    setTxHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem(`txHistory-${userId}`, JSON.stringify(updatedHistory));
    
    // Update ration status in local state
    const updatedRations = userRations.map(ration => {
      if (ration.id === rationId) {
        return { ...ration, isPaid: true };
      }
      return ration;
    });
    
    setUserRations(updatedRations);
    setSuccess(`Payment of ${amount} ETH for ration #${rationId} completed successfully!`);
    
  } catch (error) {
    console.error("Error making payment:", error);
    setError("Payment failed: " + error.message);
  } finally {
    setPaying(false);
  }
};

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Mock chart data based on user's category
  const getChartData = () => {
    if (!userData) return [];
    
    // Different allocation patterns based on user category
    switch (userData.category) {
      case 1: // BPL
        return [
          { name: "Jan", rice: 5, wheat: 3, sugar: 1, oil: 1 },
          { name: "Feb", rice: 5, wheat: 3, sugar: 1, oil: 1 },
          { name: "Mar", rice: 6, wheat: 4, sugar: 2, oil: 1 },
          { name: "Apr", rice: 5, wheat: 3, sugar: 1, oil: 1 },
          { name: "May", rice: 7, wheat: 4, sugar: 2, oil: 2 },
        ];
      case 2: // APL
        return [
          { name: "Jan", rice: 3, wheat: 2, sugar: 0.5, oil: 0.5 },
          { name: "Feb", rice: 3, wheat: 2, sugar: 0.5, oil: 0.5 },
          { name: "Mar", rice: 4, wheat: 3, sugar: 1, oil: 0.5 },
          { name: "Apr", rice: 3, wheat: 2, sugar: 0.5, oil: 0.5 },
          { name: "May", rice: 5, wheat: 3, sugar: 1, oil: 1 },
        ];
      default:
        return [
          { name: "Jan", rice: 4, wheat: 2, sugar: 1, oil: 0.5 },
          { name: "Feb", rice: 4, wheat: 2, sugar: 1, oil: 0.5 },
          { name: "Mar", rice: 5, wheat: 3, sugar: 1, oil: 1 },
          { name: "Apr", rice: 4, wheat: 2, sugar: 1, oil: 0.5 },
          { name: "May", rice: 6, wheat: 3, sugar: 2, oil: 1 },
        ];
    }
  };

  // Get stats for dashboard
  const getStats = () => [
    {
      title: "Category",
      value: userData?.category === 1 ? "BPL" : userData?.category === 2 ? "APL" : "General",
      change: "Active",
      icon: Users,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Rations Received",
      value: userRations.filter(r => r.isPaid).length.toString(),
      change: `+${userRations.filter(r => r.isPaid).length > 0 ? 1 : 0}`,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Payments",
      value: userRations.filter(r => !r.isPaid).length.toString(),
      change: userRations.filter(r => !r.isPaid).length > 0 ? "Action Required" : "All Clear",
      icon: IndianRupee,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Depot",
      value: userData?.depotId ? `#${userData.depotId}` : "None",
      change: userData?.depotId ? "Assigned" : "Unassigned",
      icon: HeartHandshake,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  // Payment Notification Component
  const PaymentNotification = ({ notification, onClose, onPay }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 mr-4 bg-green-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold">New Ration Allocated!</h3>
          </div>
          
          <div className="border-t border-b py-4 my-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Depot:</span>
              <span className="font-medium">#{notification.depotId}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount Due:</span>
              <span className="font-medium text-green-600">{notification.amount} ETH</span>
            </div>
            
            <div className="mt-3">
              <p className="font-medium text-gray-700">Items included:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {notification.items.map((item, index) => (
                  <Badge key={index} className="bg-green-50 text-green-800 border-green-200">
                    {item.name}: {item.quantity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between gap-4 mt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
            >
              Pay Later
            </Button>
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={onPay}
            >
              <IndianRupee className="h-4 w-4 mr-2" />
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    );
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 mx-auto animate-spin text-emerald-600" />
          <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !isConnected) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto text-red-600" />
          <h2 className="mt-4 text-xl font-bold text-gray-800">Authentication Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <Button 
            className="mt-6 bg-emerald-600 hover:bg-emerald-700" 
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
          {userData && (
            <p className="text-gray-500">Welcome back, {userData.name}</p>
          )}
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-gray-500">
            Connected as: <span className="font-mono">{userAddress?.substring(0, 6)}...{userAddress?.substring(userAddress.length - 4)}</span>
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-green-50 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="rations" className="data-[state=active]:bg-white">
            My Rations
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white">
            Transaction History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {getStats().map((stat, index) => (
              <motion.div key={index} variants={item}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        <div className="flex items-center mt-1 text-sm">
                          <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
                          <span className="text-emerald-500">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`${stat.color} p-3 rounded-full`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Allocation Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle>Ration Allocation History</CardTitle>
                <CardDescription>
                  Monthly allocation based on your category: {userData?.category === 1 ? "BPL" : userData?.category === 2 ? "APL" : "General"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Bar dataKey="rice" name="Rice (kg)" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="wheat" name="Wheat (kg)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="sugar" name="Sugar (kg)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="oil" name="Oil (L)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pending Payments */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Payments</CardTitle>
                  <CardDescription>Rations allocated but not yet paid</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userRations.filter(r => !r.isPaid).length > 0 ? (
                      userRations.filter(r => !r.isPaid).map((ration) => (
                        <div key={ration.id} className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
                          <div className="w-2 h-2 mt-2 rounded-full bg-amber-500"></div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="text-sm font-medium">Ration #{ration.id}</h4>
                              <Badge className="bg-amber-100 text-amber-800">Pending Payment</Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Allocated on {formatDate(ration.date)}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              From Depot #{ration.depotId}
                            </p>
                            <Button
                              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-sm h-8"
                              onClick={() => {
                                setSelectedRation(ration);
                                setPaymentAmount(ration.amount || "0.01");
                                setPaymentDialog(true);
                              }}
                            >
                              <IndianRupee className="h-3.5 w-3.5 mr-1" />
                              Pay {ration.amount || "0.01"} ETH
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-green-50/50 rounded-md">
                        <CheckCircle2 className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-gray-600">No pending payments</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest blockchain transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {txHistory.length > 0 ? (
                      txHistory.slice(0, 3).map((tx, i) => (
                        <div key={i} className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
                          <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="text-sm font-medium">{tx.type}</h4>
                              <span className="text-sm font-mono text-emerald-600">{tx.amount}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {tx.details}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDate(tx.timestamp)}
                            </p>
                            <a 
                              href={`https://sepolia.etherscan.io/tx/${tx.txHash}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline flex items-center mt-1"
                            >
                              View on Etherscan
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-green-50/50 rounded-md">
                        <History className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-gray-600">No transaction history yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                {txHistory.length > 3 && (
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-emerald-200 text-emerald-700"
                      onClick={() => setActiveTab('history')}
                    >
                      View All Transactions
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* My Rations Tab */}
        <TabsContent value="rations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Ration Allocations</CardTitle>
              <CardDescription>View all allocated rations and make payments</CardDescription>
            </CardHeader>
            <CardContent>
              {userRations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-50 hover:bg-green-100">
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Depot</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userRations.map((ration) => (
                      <TableRow key={ration.id} className="hover:bg-green-50/50">
                        <TableCell className="font-medium">{ration.id}</TableCell>
                        <TableCell>{formatDate(ration.date)}</TableCell>
                        <TableCell>#{ration.depotId}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {ration.items.map((item, index) => (
                              <Badge key={index} variant="outline" className="bg-green-50 text-green-800 border-green-200">
                                {item.name}: {item.quantity}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {ration.isPaid ? (
                            <Badge className="bg-green-100 text-green-800">Paid</Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800">Payment Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {!ration.isPaid && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                              onClick={() => {
                                setSelectedRation(ration);
                                setPaymentAmount(ration.amount || "0.01");
                                setPaymentDialog(true);
                              }}
                            >
                              <IndianRupee className="h-3.5 w-3.5 mr-1" />
                              Pay Now
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 bg-green-50/50 rounded-md">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600">No rations allocated yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Allocations</CardTitle>
              <CardDescription>Schedule for upcoming ration distributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 pb-4 border-b">
                  <div className="min-w-[60px] text-center">
                    <p className="text-sm font-bold text-emerald-600">May 15</p>
                    <p className="text-xs text-gray-500">Mon</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Regular Monthly Package</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Rice, wheat, oil, and pulses
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      At Depot #{userData?.depotId || "N/A"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 pb-4">
                  <div className="min-w-[60px] text-center">
                    <p className="text-sm font-bold text-emerald-600">Jun 01</p>
                    <p className="text-xs text-gray-500">Thu</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Quarterly Distribution</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Extended package with additional items
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      At Depot #{userData?.depotId || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transaction History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Complete record of your blockchain transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {txHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-50 hover:bg-green-100">
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Transaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {txHistory.map((tx, index) => (
                      <TableRow key={index} className="hover:bg-green-50/50">
                        <TableCell className="font-medium">{tx.type}</TableCell>
                        <TableCell>{formatDate(tx.timestamp)}</TableCell>
                        <TableCell>{tx.details}</TableCell>
                        <TableCell>
                          <span className="font-mono text-emerald-600">{tx.amount}</span>
                        </TableCell>
                        <TableCell>
                          {tx.txHash && (
                            <a 
                              href={`https://sepolia.etherscan.io/tx/${tx.txHash}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-600 hover:underline flex items-center"
                            >
                              View on Etherscan
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </a>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 bg-green-50/50 rounded-md">
                  <Receipt className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600">No transaction history yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>
              Complete payment for your allocated ration
            </DialogDescription>
          </DialogHeader>
          
          {selectedRation && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ration ID:</span>
                  <span className="font-medium">{selectedRation.id}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Depot:</span>
                  <span className="font-medium">#{selectedRation.depotId}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">{formatDate(selectedRation.date)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-mono font-bold text-emerald-600">{paymentAmount} ETH</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-700">Items included:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRation.items.map((item, index) => (
                    <Badge key={index} className="bg-emerald-50 text-emerald-800 border-emerald-200">
                      {item.name}: {item.quantity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPaymentDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => payForRation(selectedRation.id, paymentAmount)}
              disabled={paying}
            >
              {paying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <IndianRupee className="h-4 w-4 mr-2" />
                  Pay {paymentAmount} ETH
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Notification Popup */}
      {newAllocationNotice && (
        <PaymentNotification 
          notification={newAllocationNotice}
          onClose={() => setNewAllocationNotice(null)}
          onPay={() => handlePayNow(newAllocationNotice)}
        />
      )}
    </div>
  )
}