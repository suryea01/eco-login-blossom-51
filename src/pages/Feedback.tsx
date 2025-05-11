
import { DashboardLayout } from "@/components/DashboardLayout";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackList } from "@/components/FeedbackList";
import { useAuth } from "@/contexts/AuthContext";

const Feedback = () => {
  const { profile } = useAuth();
  
  return (
    <DashboardLayout role={profile?.role || 'waste-seller'}>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Feedback</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <FeedbackForm />
          </div>
          
          <div>
            <FeedbackList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
