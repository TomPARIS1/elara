
import { formatCurrency } from '@/lib/formatCurrency';
import { imageUrl } from '@/lib/imageUrl';
import { getMyOrders } from '@/sanity/lib/orders/getMyOrders';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Calendar, CheckCircle, Clock, DollarSign, Package, Tag, XCircle } from 'lucide-react';

const StatusMap = {
    pending: { icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10", label: "Pending" },
    paid: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Paid" },
    shipped: { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", label: "Shipped" },
    delivered: { icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-500/10", label: "Delivered" },
    cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Cancelled" },
  };
  
  
  async function OrdersPage() {
      const { userId } = await auth();
  
      if (!userId) {
          return redirect("/");
      }
  
      const orders = await getMyOrders(userId);
  
    return (
      <main className="min-h-screen bg-background text-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-12">My Orders</h1>
  
              {orders.length === 0 ? (
                  <div className="text-center py-24 border border-border bg-card">
                      <p className="text-muted-foreground font-light mb-4">
                          You have not placed any order yet.
                      </p>
                      <button 
                          onClick={() => redirect('/')}
                          className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-light text-sm tracking-wide"
                      >
                          Go to Shop
                      </button>
                  </div>
              ) : (
                  <div className="flex flex-col gap-8">
                      {orders.map((order) => {
                          const statusInfo = StatusMap[order.status as keyof typeof StatusMap] || { 
                              icon: Tag, color: "text-gray-500", bg: "bg-gray-500/10", label: order.status || "Unknown" 
                          };
                          const IconComponent = statusInfo.icon;
                          
                          return (
                              <div 
                                  key={order.orderNumber} 
                                  className="bg-card border border-border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                              >
                                  <div className="p-5 md:p-6 border-b border-border grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-light">
                                      
                                      <div className="flex flex-col">
                                          <span className="text-muted-foreground uppercase text-xs mb-1">Order Number</span>
                                          <span className="text-foreground font-medium flex items-center gap-2">
                                              <Tag className="w-4 h-4 text-muted-foreground" />
                                              {order.orderNumber}
                                          </span>
                                      </div>
                                      
                                      <div className="flex flex-col">
                                          <span className="text-muted-foreground uppercase text-xs mb-1">Date</span>
                                          <span className="text-foreground flex items-center gap-2">
                                              <Calendar className="w-4 h-4 text-muted-foreground" />
                                              {order.orderDate
                                                  ? new Date(order.orderDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
                                                  : "N/A"}
                                          </span>
                                      </div>
                                      
                                      <div className="flex flex-col">
                                          <span className="text-muted-foreground uppercase text-xs mb-1">Total</span>
                                          <span className="text-foreground font-medium flex items-center gap-2">
                                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                                              {formatCurrency(order.totalPrice ?? 0, "USD")}
                                          </span>
                                      </div>
  
                                      <div className="flex flex-col items-start md:items-end">
                                          <span className="text-muted-foreground uppercase text-xs mb-1 hidden md:block">Status</span>
                                          <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 ${statusInfo.bg} ${statusInfo.color}`}>
                                              <IconComponent className="w-4 h-4" />
                                              {statusInfo.label}
                                          </span>
                                      </div>
                                  </div>
                                  
                                  <div className="p-5 md:p-6 space-y-4">
                                      <h3 className="text-base font-medium text-foreground border-b border-border pb-2 mb-4">Order Items ({order.products?.length})</h3>
                                      
                                      <div className="space-y-4">
                                          {order.products?.map((item) => (
                                              <div 
                                                  key={item.product?._id}
                                                  className="grid grid-cols-12 items-center gap-4 text-sm"
                                              >
                                                  <div className="col-span-2 relative w-12 h-12 bg-muted rounded-md overflow-hidden shrink-0">
                                                      {item.product?.image && (
                                                          <Image  
                                                          src={imageUrl(item.product.image).url()}
                                                          alt={item.product.name ?? "Product Name"}
                                                          fill
                                                          sizes="48px"
                                                          className="object-contain"
                                                        />
                                                      )}
                                                  </div>
                                                  
                                                  <p className="col-span-5 font-light text-foreground line-clamp-2">
                                                      {item.product?.name ?? "Unknown Product"}
                                                  </p>
                                                  
                                                  <p className="col-span-2 text-center text-muted-foreground font-light">
                                                      Qty: {item.quantity ?? "N/A"}
                                                  </p>
                                                  
                                                  <p className="col-span-3 text-right font-medium text-foreground">
                                                      {item.product?.price && item.quantity
                                                          ? formatCurrency(item.product.price * item.quantity, "USD")
                                                          : "N/A"}
                                                  </p>
                                              </div>   
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              )}
          </div>
      </main>
    );
  }
  
  export default OrdersPage;