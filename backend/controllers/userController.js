import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";

const secret = "test12341234";

function getStartupCode(language) {
  switch (language.toLowerCase()) {
    case "python":
      return `print("Hello World")`;

    case "java":
      return `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`;

    case "javascript":
      return `console.log("Hello World");`;

    case "cpp":
      return `
#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}`;

    case "c":
      return `
#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`;

    case "go":
      return `
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}`;

    case "bash":
      return `echo "Hello World"`;

    default:
      return "Language not supported";
  }
}

export const signUp = async (req, res) => {
  try {
    // code to create a user
    let { email, password, fullName } = req.body;

    let emailCon = await User.findOne({ email: email });

    if (emailCon) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hashing the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });

    return res.status(200).json({
      success: true,
      msg: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ userId: user._id }, secret);

        return res.status(200).json({
          success: true,
          msg: "User logged in successfully",
          token,
        });
      } else {
        return res.status(401).json({
          success: false,
          msg: "Invalid password",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const createProj = async (req, res) => {
  try {
    let { name, projLanguage, token, version } = req.body;
    let decoded = jwt.verify(token, secret);

    let user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    const project = await Project.create({
      name,
      projLanguage,
      createdBy: user._id,
      code: getStartupCode(projLanguage),
      version: version,
    });

    return res.status(200).json({
      success: true,
      msg: "Project created successfully",
      projectId: project._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const saveProject = async (req, res) => {
  try {
    let { token, projectId, code } = req.body;

    console.log("DATA: ", token, projectId, code);

    let decoded = jwt.verify(token, secret);

    let user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    let project = await Project.findOneAndUpdate(
      { _id: projectId },
      { code: code }
    );

    return res.status(200).json({
      success: true,
      msg: "Project saved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    let { token } = req.body;
    let decoded = jwt.verify(token, secret);

    let user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    let projects = await Project.find({ createdBy: user._id });

    return res.status(200).json({
      success: true,
      msg: "Projects fetched successfully",
      projects: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getProject = async (req, res) => {
  try {
    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, secret);

    let user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    let project = await Project.findOne({ _id: projectId });

    if (project) {
      return res.status(200).json({
        success: true,
        msg: "Project fetched successfully",
        project: project,
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    let project = await Project.findOneAndDelete({ _id: projectId });

    return res.status(200).json({
      success: true,
      msg: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const editProject = async (req, res) => {
  try {
    let { token, projectId, name } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    let project = await projectModel.findOne({ _id: projectId });
    if (project) {
      project.name = name;
      await project.save();
      return res.status(200).json({
        success: true,
        msg: "Project edited successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    let { token } = req.body;
    let decoded = jwt.verify(token, secret);

    let user = await User.findOne({ _id: decoded.userId }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    console.log("Fetched USER", user);

    return res.status(200).json({
      success: true,
      msg: "User fetched successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
