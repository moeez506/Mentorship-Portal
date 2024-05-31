import Roadmap from '../models/roadmap.js';
import Student from '../models/student.js';

export const createRoadmap = async (req, res) => {
    const roadmap = new Roadmap(req.body);
    try {
        //add custom validation to check req body
        //get mentorId fom user_id
        const newRoadmap = await roadmap.save();
        res.status(201).json({data: newRoadmap});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getRoadmap = async (req, res) => {
    const { id } = req.params;
    try {
        const roadmap = await Roadmap.findById(id);
        if (!roadmap) {
            return res.status(404).json({ message: 'Roadmap not found' });
        }
        res.json({data : roadmap});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllRoadmaps = async (req, res) => {
    try {
        const roadmaps = await Roadmap.find();
        res.json({data : roadmaps});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update Roadmap for mentor
export const updateRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData  = req.body;

    // Validate request body ony having title, description
    

    if (!id || !updateData) {
      return res.status(400).json({ message: "ID and update data are required" });
    }


    const updatedRoadmap = await Roadmap.findOneAndUpdate(
      { _id: id }, // filter
      updateData, // update data
      { new: true } // options: return updated document
    );

    if (!updatedRoadmap) {
      return res.status(404).json({ message: "No roadmap found with this ID" });
    }

    res.status(200).json({ message: "Roadmap updated successfully", data: updatedRoadmap });
  } catch (error) {
    console.error("Error during roadmap update:", error);
  
  }
};

export const deleteRoadmap = async (req, res) => {
    const { id } = req.params;

    try {
        const roadmap = await Roadmap.findById(id);

        if (!roadmap) {
            return res.status(404).json({ message: 'Roadmap not found' });
        }

        await Roadmap.findByIdAndDelete(id);

        res.json({ message: 'Roadmap deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//assign roadmap to student

export const assignRoadmapToStudent = async (req, res) => {
  try {
    const { roadmapId, studentId } = req.body;

    // Validate request body
    if (!roadmapId || !studentId) {
      return res.status(400).json({ message: "Roadmap ID and student ID are required" });
    }

    //if roadmap exit
    const originalRoadmap = await Roadmap.findById(roadmapId);
    if (!originalRoadmap) {
      return res.status(404).json({ message: "No roadmap found with this ID" });
    }

    //if student exit
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "No student found with this ID" });
    }

    //if student already have roadmap
    const studentExistingRoadmap = await Roadmap.findOne({ studentId: studentId });
    if (studentExistingRoadmap) {
      return res.status(400).json({ message: "Student already has a roadmap" });
    }

    // Create a copy of the roadmap, delete id, mongo will create new one and assign it to the student
    const roadmapCopy = originalRoadmap.toObject();
    delete roadmapCopy._id;
    
    const studentRoadmap = new Roadmap({
        ...roadmapCopy,
        studentId: studentId
      });

    await studentRoadmap.save();

    res.status(200).json({ message: "Roadmap assigned to student successfully", data: studentRoadmap });
  } catch (error) {
    console.error("Error during roadmap assignment:", error);
  }
    
};


export const getMentorRoadmaps = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Validate request body
        if (!id) {
        return res.status(400).json({ message: "Mentor ID is required" });
        }
    
        const roadmaps = await Roadmap.find({ mentorId: id, studentId: null });
    
        res.status(200).json({ data: roadmaps });
    } catch (error) {
        console.error("Error during roadmap assignment:", error);
    }
}

export const getStudentRoadmap = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Validate request body
        if (!id) {
        return res.status(400).json({ message: "Student ID is required" });
        }
    
        const roadmap = await Roadmap.findOne({ studentId: id });
    
        res.status(200).json({ data: roadmap });
    } catch (error) {
        console.error("Error during roadmap assignment:", error);
    }
}


// Function for tasks

export const createTask = async (req, res) => {
    const { roadmapId, task } = req.body;

    try {
        const roadmap = await Roadmap.findById(roadmapId);

        if (!roadmap) {
            return res.status(404).json({ message: 'Roadmap not found' });
        }

        roadmap.tasks.push(task);
        const updatedRoadmap = await roadmap.save();

        res.status(201).json({ data: updatedRoadmap });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const updateTask = async (req, res) => {
  try {
    const { roadmapId, taskId, task } = req.body;

    // Validate request body
    if (!roadmapId || !taskId || !task) {
      return res.status(400).json({ message: "Roadmap ID, task ID, and task data are required" });
    }

    const roadmap = await Roadmap.findById(roadmapId);

    if (!roadmap) {
      return res.status(404).json({ message: "No roadmap found with this ID" });
    }

    // Find the task in the roadmap
    const taskInRoadmap = roadmap.tasks.id(taskId);

    if (!taskInRoadmap) {
      return res.status(404).json({ message: "No task found with this ID in the specified roadmap" });
    }

    taskInRoadmap.set(task);
   
    const updatedRoadmap = await roadmap.save();

    res.status(200).json({ message: "Task updated successfully", data: updatedRoadmap });
  } catch (error) {
    console.error("Error during task update:", error);
  }
};


export const deleteTask = async (req, res) => {
    try {
      const { roadmapId, taskId } = req.body;
  
      // Validate request body
      if (!roadmapId || !taskId) {
        return res.status(400).json({ message: "Roadmap ID and task ID are required" });
      }
  
      const roadmap = await Roadmap.findById(roadmapId);
  
      if (!roadmap) {
        return res.status(404).json({ message: "No roadmap found with this ID" });
      }
  
      // Find the task in the roadmap and remove it
      const taskInRoadmap = roadmap.tasks.id(taskId);
  
      if (!taskInRoadmap) {
        return res.status(404).json({ message: "No task found with this ID in the specified roadmap" });
      }
  
      roadmap.tasks.pull(taskId);

      const updatedRoadmap = await roadmap.save();
  
      res.status(200).json({ message: "Task deleted successfully", data: updatedRoadmap });
    } catch (error) {
      console.error("Error during task deletion:", error);
    }
  };



